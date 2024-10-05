import { DurableObject } from "cloudflare:workers";
import type { Env } from "../bindings";
import type { SqlStorage } from "@cloudflare/workers-types/experimental/index";
import type { DOSqlQuery, Primitive } from "../types";

const SETTING_ENABLED = "SETTING_ENABLED";
const SETTING_LOCKED = "SETTING_LOCKED";

export class DBMSDO extends DurableObject<Env> {
	private enabled = 0; // this is number, because in the future there might be more than 2 states
	private locked = 0; // this is number, because in the future there might be more than 2 states
	private db: SqlStorage;

	// This holds the session id for the websocket that has an active transaction
	// This variable is not sync into kv, because if the durable object resets, the transaction should reset as well
	private sessionIdInPower = null
	private rollbackPIRT = null

	constructor(state: DurableObjectState, env: Env) {
		super(state, env);

		this.db = this.ctx.storage.sql;
		void this.ctx.blockConcurrencyWhile(async () => {
			this.enabled = (await this.ctx.storage.get<number>(SETTING_ENABLED)) ?? 0;
			this.locked = 0;
			//this.locked = (await this.ctx.storage.get<number>(SETTING_LOCKED)) ?? 0;
		});
	}

	isEnabled(): boolean {
		return this.enabled === 1;
	}

	async setEnabled(state: number): Promise<void> {
		if (state !== this.enabled) {
			await this.ctx.storage.put<number>(SETTING_ENABLED, state);
			this.enabled = state;
		}
	}

	isLocked(): boolean {
		return this.locked === 1;
	}

	setLocked(state: number): void {
		if (state !== this.locked) {
//			await this.ctx.storage.put<number>(SETTING_LOCKED, state);
			this.locked = state;
		}
	}

	async beginTransaction(sessionId: string) {
		console.log(`running begin for ${sessionId}`)
		this.setLocked(1)
		this.sessionIdInPower = sessionId
		this.rollbackPIRT = await this.ctx.storage.getCurrentBookmark()
	}

	async commitTransaction() {
		console.log(`running commit`)
		this.setLocked(0)
		this.sessionIdInPower = null
		this.rollbackPIRT = null
	}

	async rollbackTransaction() {
		if (this.isLocked() && this.rollbackPIRT) {
			console.log(`running rollback`)
			await this.ctx.storage.onNextSessionRestoreBookmark(this.rollbackPIRT);
			await this.ctx.abort();
		}
	}

	async awaitUntil(conditionFunction) {
	  const poll = resolve => {
		if(conditionFunction()) resolve();
		else setTimeout(_ => poll(resolve), 50);  // TODO: check if this can go down further
	  }

	  return new Promise(poll);
	}


	async putKV(key: string, value: Primitive): Promise<void> {
		await this.ctx.storage.put(`USER-${key}`, value);
	}

	async getKV(key: string): Promise<Primitive | undefined> {
		await this.ctx.storage.get<Primitive>(`USER-${key}`);
	}

	async sql(params: DOSqlQuery): Promise<any> {
		if (this.enabled === 0) {
			throw new Error(`This database doesn't exist`);
		}

		let cursor;
		if (params.arguments) {
			cursor = this.db.exec(params.query, ...params.arguments);
			// const stmt = this.db.prepare(params.query);
			// cursor = (stmt as any)(...params.arguments) as SqlStorageCursor;
		} else {
			cursor = this.db.exec(params.query);
		}

		let result
		if (params.arrayMode === true) {
			result = cursor.raw().toArray()
		} else {
			result = cursor.toArray()
		}

		return {
			results: result,
			meta: {
				rows_read: cursor.rowsRead,
				rows_written: cursor.rowsWritten,
				//row_count: cursor.rowcount,
				//last_row_id: cursor.lastrowid,
				...cursor,
			},
		};
	}

	async stats(): Promise<object> {
		if (this.enabled === 0) {
			throw new Error(`This database doesn't exist`);
		}

		const tables = (
			await this.sql({
				query: `SELECT *
						FROM sqlite_master
						where type = 'table'
						  and tbl_name not like '_cf%';`,
			})
		).results.map((obj) => {
			const columns = obj.sql
				.split("(")[1]
				.split(")")[0]
				.split(",")
				.map((col: string) => col.trim().replaceAll('"', "").split(" ")[0]);

			return {
				...obj,
				columns,
			};
		});

		return {
			databaseSize: this.ctx.storage.sql.databaseSize,
			tables,
		};
	}

	async destroy(): Promise<void> {
		await this.ctx.storage.deleteAll();
	}

	declare __DURABLE_OBJECT_BRAND: never;

	async fetch(request) {
		const webSocketPair = new WebSocketPair();
		const [client, server] = Object.values(webSocketPair);

		// Calling `acceptWebSocket()` informs the runtime that this WebSocket is to begin terminating
		// request within the Durable Object. It has the effect of "accepting" the connection,
		// and allowing the WebSocket to send and receive messages.
		// Unlike `ws.accept()`, `state.acceptWebSocket(ws)` informs the Workers Runtime that the WebSocket
		// is "hibernatable", so the runtime does not need to pin this Durable Object to memory while
		// the connection is open. During periods of inactivity, the Durable Object can be evicted
		// from memory, but the WebSocket connection will remain open. If at some later point the
		// WebSocket receives a message, the runtime will recreate the Durable Object
		// (run the `constructor`) and deliver the message to the appropriate handler.
		this.ctx.acceptWebSocket(server, [crypto.randomUUID()]);

		return new Response(null, {
			status: 101,
			webSocket: client,
		});
	}

	async webSocketMessage(ws, message) {
		const tags = this.ctx.getTags(ws)

		// console.log(message)
		const resp = await this.processWSMessage(JSON.parse(message.toString()), tags[0]);

		// console.log(JSON.stringify(resp))
		ws.send(JSON.stringify(resp));
	}

	async processWSMessage(message: object, wsSessionId) {
		switch (message.type) {
			case "request":
				switch (message.request.type) {
					case "execute":
						console.log(`ws execute ${wsSessionId}`)
						try {
							if (this.isLocked() && wsSessionId !== this.sessionIdInPower) {

								console.log('db locked: waiting')
								await this.awaitUntil(_ => this.isLocked() === 1)
							}

							const queries = message.request.stmt.query.split(';').map((q) => q.trim().toLowerCase())
							for (const q of queries) {
								if (q === 'begin') {
									if (this.isLocked()) {
										return {
											type: "response_error",
											error: "database already locked to a different transaction",
										}
									}

									await this.beginTransaction(wsSessionId)
									return {
										type: "execute",
										result: {
											results: [],
											meta: {}
										},
									}
								}

								if (q === 'commit') {
									if (!this.isLocked()) {
										return {
											type: "response_error",
											error: "no transaction is progress to commit",
										}
									}

									if (wsSessionId !== this.sessionIdInPower) {
										return {
											type: "response_error",
											error: "your session cannot commit another one transaction",
										}
									}

									await this.commitTransaction()
									return {
										type: "execute",
										result: {
											results: [],
											meta: {}
										},
									}
								}

								if (q === 'rollback') {
									if (!this.isLocked()) {
										return {
											type: "response_error",
											error: "no transaction is progress to rollback",
										}
									}

									if (wsSessionId !== this.sessionIdInPower) {
										return {
											type: "response_error",
											error: "your session cannot rollback another one transaction",
										}
									}

									this.ctx.waitUntil(this.rollbackTransaction())
									return {
										type: "execute",
										result: {
											results: [],
											meta: {}
										},
									}
								}
							}

							return {
								type: "execute",
								result: await this.sql({
									query: message.request.stmt.query,
									arguments: message.request.stmt.arguments,
									arrayMode: true,
								}),
							};
						} catch (e) {
							console.error(e)
							return {
								type: "response_error",
								error: e.toString(),
							};
						}

					default:
						throw new Error(
							`Unknown message.request.type: ${message.request.type}`,
						);
				}

			default:
				throw new Error(`Unknown message.type: ${message.type}`);
		}
	}

	async webSocketClose(ws, code, reason, wasClean) {
		ws.close(code, "Durable Object is closing WebSocket");

		// If the socket disconnecting is the one in power, rollback!
		if (this.isLocked()) {
			const tags = this.ctx.getTags(ws)
			if (tags[0] === this.sessionIdInPower) {
				await this.rollbackTransaction()
			}
		}
	}
}

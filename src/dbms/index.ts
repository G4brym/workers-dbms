import {DurableObject} from "cloudflare:workers";
import type {Env} from "../bindings";
import type {SqlStorage} from "@cloudflare/workers-types/experimental/index";
import type {DOSqlQuery, Primitive} from "../types";

const SETTING_ENABLED = "SETTING_ENABLED";
const SETTING_LOCKED = "SETTING_LOCKED";

export class DBMSDO extends DurableObject<Env> {
	private enabled = 0; // this is number, because in the future there might be more than 2 states
	private locked = 0; // this is number, because in the future there might be more than 2 states
	private db: SqlStorage;

	constructor(state: DurableObjectState, env: Env) {
		super(state, env);

		this.db = this.ctx.storage.sql;
		void this.ctx.blockConcurrencyWhile(async () => {
			this.enabled = (await this.ctx.storage.get<number>(SETTING_ENABLED)) ?? 0;
			this.locked = (await this.ctx.storage.get<number>(SETTING_LOCKED)) ?? 0;
		});
	}

	async isEnabled(): Promise<number> {
		return this.enabled
	}

	async setEnabled(state: number): Promise<void> {
		if (state !== this.enabled) {
			await this.ctx.storage.put<number>(SETTING_ENABLED, state);
			this.enabled = state;
		}
	}

	async isLocked(): Promise<number> {
		return this.locked
	}

	async setLocked(state: number): Promise<void> {
		if (state !== this.locked) {
			await this.ctx.storage.put<number>(SETTING_LOCKED, state);
			this.locked = state;
		}
	}

	async putKV(key: string, value: Primitive): Promise<void> {
		await this.ctx.storage.put(`USER-${key}`, value);
	}

	async getKV(key: string): Promise<Primitive | void> {
		await this.ctx.storage.get<Primitive>(`USER-${key}`);
	}

	async sql(params: DOSqlQuery): Promise<object> {
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

		let result = Array.from(cursor)

		if (params.arrayMode === true) {
			result = result.map((obj) => Object.values(obj))
		}

		return {
			results: result,
			meta: {
				"rows_read": cursor.rowsRead,
				"rows_written": cursor.rowsWritten,
				"row_count": cursor.rowcount,
				"last_row_id": cursor.lastrowid,
				...cursor
			}
		}
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
		this.ctx.acceptWebSocket(server);

		return new Response(null, {
			status: 101,
			webSocket: client,
		});
	}

	async webSocketMessage(ws, message) {
		// console.log(message)
		const resp = await this.processWSMessage(JSON.parse(message.toString()))

		// console.log(resp)
		ws.send(JSON.stringify(resp));
	}

	async processWSMessage(message: object) {
		switch (message.type) {
			case 'request':
				switch (message.request.type) {
					case 'execute':
						try {
							return {
								"type": "execute",
								"result": await this.sql({
									query: message.request.stmt.query,
									arguments: message.request.stmt.arguments,
									arrayMode: true
								}),
							}
						} catch (e) {
							return {
								"type": "response_error",
								"error": e.toString()
							}
						}

					default:
						throw new Error(`Unknown message.request.type: ${message.request.type}`)
				}

			default:
			throw new Error(`Unknown message.type: ${message.type}`)
		}

	}

	async webSocketClose(ws, code, reason, wasClean) {
		ws.close(code, "Durable Object is closing WebSocket");
	}
}

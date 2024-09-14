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

	constructor(state: DurableObjectState, env: Env) {
		super(state, env);

		this.db = this.ctx.storage.sql;
		void this.ctx.blockConcurrencyWhile(async () => {
			this.enabled = (await this.ctx.storage.get<number>(SETTING_ENABLED)) ?? 0;
			this.locked = (await this.ctx.storage.get<number>(SETTING_LOCKED)) ?? 0;
		});
	}

	async setEnabled(state: number): Promise<void> {
		if (state !== this.enabled) {
			await this.ctx.storage.put<number>(SETTING_ENABLED, state);
			this.enabled = state;
		}
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

	async sql(params: DOSqlQuery): Promise<Array<any>> {
		if (this.enabled === 0) {
			throw new Error(`This database doesn't exist`);
		}

		let cursor;
		if (params.arguments) {
			const stmt = this.db.prepare(params.query);
			cursor = (stmt as any)(...params.arguments) as SqlStorageCursor;
		} else {
			cursor = this.db.exec(params.query);
		}

		return Array.from(cursor);
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
		).map((obj) => {
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
}

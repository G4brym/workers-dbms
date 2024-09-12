import {DurableObject} from "cloudflare:workers";
import {Env} from "../bindings";
import {SqlStorage} from "@cloudflare/workers-types/experimental/index";
import {DOSqlQuery, Primitive} from "../types";

const SETTING_ENABLED = "SETTING_ENABLED"
const SETTING_IS_LOCKED = "SETTING_IS_LOCKED"

export class DBMSDO extends DurableObject<Env> {
	private enabled: number = 0;  // this is number, because in the future there might be more than 2 states
	private isLocked: number = 0;  // this is number, because in the future there might be more than 2 states
	private db: SqlStorage

	constructor(state: DurableObjectState, env: Env) {
		super(state, env);

		this.db = this.ctx.storage.sql
		void this.ctx.blockConcurrencyWhile(async () => {
			this.enabled = (await this.ctx.storage.get<number>(SETTING_ENABLED)) ?? 0
			this.isLocked = (await this.ctx.storage.get<number>(SETTING_IS_LOCKED)) ?? 0
		})
	}

	async setEnabled(state: number): Promise<void> {
		await this.ctx.storage.put<number>(SETTING_ENABLED, state)
	}

	async setLocked(state: number): Promise<void> {
		await this.ctx.storage.put<number>(SETTING_IS_LOCKED, state)
	}

	async putKV(key: string, value: Primitive): Promise<void> {
		await this.ctx.storage.put(`USER-${key}`, value)
	}

	async getKV(key: string): Promise<Primitive | undefined> {
		await this.ctx.storage.get<Primitive>(`USER-${key}`)
	}

	async sql(params: DOSqlQuery): Promise<Array<any>> {
		if (this.enabled === 0) {
			throw new Error(`This database doesn't exist`)
		}

		let cursor
		if (params.arguments) {
			let stmt = this.db.prepare(params.query)
			// @ts-expect-error Their types appear to be wrong here
			cursor = (stmt as any)(...params.arguments) as SqlStorageCursor
		} else {
			cursor = this.db.exec(params.query)
		}

		return Array.from(cursor)
	}

	async destroy(): Promise<void> {
		await this.ctx.storage.deleteAll();
	}

	__DURABLE_OBJECT_BRAND: never;
}

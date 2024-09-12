import {Env} from "../../bindings";
import {DurableObjectStub} from "@cloudflare/workers-types/experimental/index";
import {DBMSDO} from "../index";
import {migrations} from "./migrations";

const INTERNAL_CONFIG_DATABASE_ID = `workers-dbsm-internal-configs`

export async function getConfigDatabase(env: Env): Promise<DurableObjectStub<DBMSDO>> {
	const id = env.DBSM_DO.idFromName(INTERNAL_CONFIG_DATABASE_ID);
	const stub = env.DBSM_DO.get(id)
	await stub.setEnabled(1)

	await applyConfigMigrations(stub)

	return stub
}

const LAST_RUN_MIGRATION_INDEX = `LAST_RUN_MIGRATION_INDEX`;

async function applyConfigMigrations(stub: DurableObjectStub<DBMSDO>) {
	await stub.setEnabled(1)

	const lastRunMigrationIndex = (await stub.getKV(LAST_RUN_MIGRATION_INDEX)) ?? 0;
	for (const migration of migrations.slice(lastRunMigrationIndex)) {
		stub.sql({
			query: migration.sql
		})
	}
	await stub.putKV(LAST_RUN_MIGRATION_INDEX, migrations.length);
}

import { fromHono } from "chanfana";
import { CreateDatabase } from "./endpoints/createDatabase";
import { DeleteDatabase } from "./endpoints/deleteDatabase";
import { QueryDatabase } from "./endpoints/queryDatabase";
import { ListDatabases } from "./endpoints/listDatabases";
import { StatsDatabase } from "./endpoints/statsDatabase";

export function buildOpenAPI(app) {
	const openapi = fromHono(app, {
		docs_url: "/api",
		schema: {
			info: {
				title: "workers-dbms",
				version: "1.0",
			},
		},
	});

	openapi.get("/api/v1/databases", ListDatabases);
	openapi.post("/api/v1/databases", CreateDatabase);
	openapi.post("/api/v1/databases/:database_id/query", QueryDatabase);
	openapi.post("/api/v1/databases/:database_id/stats", StatsDatabase);
	openapi.delete("/api/v1/databases/:database_id", DeleteDatabase);

	return openapi;
}

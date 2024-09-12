import {Env} from "../bindings";
import {Hono} from "hono";
import {fromHono} from "chanfana";
import {CreateDatabase} from "./endpoints/createDatabase";
import {DeleteDatabase} from "./endpoints/deleteDatabase";
import {QueryDatabase} from "./endpoints/queryDatabase";

export const app = new Hono<Env>()
export const openapi = fromHono(app, {
	docs_url: '/',
	schema: {
		info: {
			title: 'workers-dbms',
			version: '1.0',
		},
	}
})

openapi.post('/api/v1/databases', CreateDatabase)
openapi.post('/api/v1/databases/:database_id/query', QueryDatabase)
openapi.delete('/api/v1/databases/:database_id', DeleteDatabase)

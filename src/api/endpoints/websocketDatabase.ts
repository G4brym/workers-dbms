import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { databaseIdField } from "../../types";
import { getConfigDatabase } from "../../dbms/configs";

export class WebsocketDatabase extends OpenAPIRoute {
	schema = {
		summary: "Websocket Database",
		tags: ["Databases"],
		request: {
			params: z.object({
				database_id: databaseIdField,
			}),
		},
	};

	async handle(c) {
		const data = await this.getValidatedData<typeof this.schema>();

		const id = c.env.DBSM_DO.idFromName(data.params.database_id);
		const stub = c.env.DBSM_DO.get(id);

		if (!(await stub.isEnabled())) {
			const configDatabase = await getConfigDatabase(c.env);
			await stub.setEnabled(1);
			await configDatabase.sql({
				query: "INSERT INTO databases (id) values (?) RETURNING *",
				arguments: [data.params.database_id],
			});
		}

		// Expect to receive a WebSocket Upgrade request.
		// If there is one, accept the request and return a WebSocket Response.
		const upgradeHeader = c.req.raw.headers.get("Upgrade");
		if (!upgradeHeader || upgradeHeader !== "websocket") {
			return new Response("Durable Object expected Upgrade: websocket", {
				status: 426,
			});
		}

		return stub.fetch(c.req.raw);
	}
}

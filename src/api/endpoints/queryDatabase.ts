import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { databaseIdField } from "../../types";
import { getConfigDatabase } from "../../dbms/configs";

export class QueryDatabase extends OpenAPIRoute {
	schema = {
		summary: "Query Database",
		tags: ["Databases"],
		request: {
			params: z.object({
				database_id: databaseIdField,
			}),
			body: {
				content: {
					"application/json": {
						schema: z.object({
							query: z.string(),
							arguments: z
								.array(z.string().or(z.number()).or(z.boolean()).nullable())
								.optional()
								.nullable(),
							arrayMode: z.boolean().default(false).optional(),
						}),
					},
				},
			},
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

		let result;
		try {
			result = await stub.sql({
				query: data.body.query,
				arguments: data.body.arguments,
				arrayMode: data.body.arrayMode,
			});
		} catch (e) {
			return c.json(
				{
					success: false,
					error: e.message,
				},
				500,
			);
		}

		return c.json(result);
	}
}

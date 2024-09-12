import {OpenAPIRoute} from "chanfana";
import {z} from "zod";
import {databaseIdField} from "../../types";

export class QueryDatabase extends OpenAPIRoute {
	schema = {
		summary: 'Query Database',
		tags: ['Databases'],
		request: {
			params: z.object({
				database_id: databaseIdField
			}),
			body: {
				content: {
					'application/json': {
						schema: z.object({
							query: z.string(),
							arguments: z.array(z.string().or(z.number()).or(z.boolean()).nullable()).optional()
						}),
					},
				},
			},
		},
	}

	async handle(c) {
		const data = await this.getValidatedData<typeof this.schema>()

		const id = c.env.DBSM_DO.idFromName(data.params.database_id);
		const stub = c.env.DBSM_DO.get(id)

		let result
		try {
			result = await stub.sql({
			query: data.body.query,
			arguments: data.body.arguments
		})
		} catch (e) {
			return c.json({
				success: false,
				error: e.message
			}, 500)
		}

		return c.json(result)
	}
}

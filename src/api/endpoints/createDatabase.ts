import {OpenAPIRoute} from "chanfana";
import {z} from "zod";
import {databaseIdField} from "../../types";
import {getConfigDatabase} from "../../dbms/configs";

export class CreateDatabase extends OpenAPIRoute {
	schema = {
		summary: 'Create Database',
		tags: ['Databases'],
		request: {
			body: {
				content: {
					'application/json': {
						schema: z.object({
							database_id: databaseIdField
						}),
					},
				},
			},
		},
	}

	async handle(c) {
		const data = await this.getValidatedData<typeof this.schema>()

		const configDatabase = await getConfigDatabase(c.env)
		let result
		try {
			result = await configDatabase.sql({
				query: 'INSERT INTO databases (id) values (?) RETURNING *',
				arguments: [data.body.database_id]
			})
		} catch (e) {
			return c.json({
				success: false,
				error: e.message
			}, 500)
		}

		const id = c.env.DBSM_DO.idFromName(data.body.database_id);
		const stub = c.env.DBSM_DO.get(id)
		await stub.setEnabled(1)

		return c.json({
			success: true,
			result
		})
	}
}

import {OpenAPIRoute} from "chanfana";
import {z} from "zod";
import {databaseIdField} from "../../types";
import {getConfigDatabase} from "../../dbms/configs";

export class ListDatabases extends OpenAPIRoute {
	schema = {
		summary: 'List Databases',
		tags: ['Databases'],
		// request: {
		// 	body: {
		// 		content: {
		// 			'application/json': {
		// 				schema: z.object({
		// 					database_id: databaseIdField
		// 				}),
		// 			},
		// 		},
		// 	},
		// },
	}

	async handle(c) {
		// const data = await this.getValidatedData<typeof this.schema>()

		const configDatabase = await getConfigDatabase(c.env)
		let result
		try {
			result = await configDatabase.sql({
				query: 'SELECT * FROM databases',
			})
		} catch (e) {
			return c.json({
				success: false,
				error: e.message
			}, 500)
		}

		return c.json({
			success: true,
			result
		})
	}
}

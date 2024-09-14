import {OpenAPIRoute} from "chanfana";
import {z} from "zod";
import {databaseIdField} from "../../types";

export class StatsDatabase extends OpenAPIRoute {
	schema = {
		summary: 'Get Database Stats',
		tags: ['Databases'],
		request: {
			params: z.object({
				database_id: databaseIdField
			}),
		},
	}

	async handle(c) {
		const data = await this.getValidatedData<typeof this.schema>()

		const id = c.env.DBSM_DO.idFromName(data.params.database_id);
		const stub = c.env.DBSM_DO.get(id)

		let result
		try {
			result = await stub.stats()
		} catch (e) {
			return c.json({
				success: false,
				error: e.message
			}, 500)
		}

		return c.json(result)
	}
}

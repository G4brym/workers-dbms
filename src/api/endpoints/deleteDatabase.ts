import {OpenAPIRoute} from "chanfana";
import {z} from "zod";
import {databaseIdField} from "../../types";
import {getConfigDatabase} from "../../dbms/configs";

export class DeleteDatabase extends OpenAPIRoute {
	schema = {
		summary: 'Delete Database',
		request: {
			params: z.object({
				database_id: databaseIdField
			})
		},
	}

	async handle(c) {
		const data = await this.getValidatedData<typeof this.schema>()

		const configDatabase = await getConfigDatabase(c.env)

		const id = c.env.DBSM_DO.idFromName(data.params.database_id);
		const stub = c.env.DBSM_DO.get(id)

		await stub.destroy()

		const result = configDatabase.sql({
			query: 'DELETE FROM databases WHERE id = ?',
			arguments: [data.params.database_id]
		})

		return c.json({
			success: true
		})
	}
}

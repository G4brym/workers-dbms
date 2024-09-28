import {
	asyncLoggerWrapper,
	FetchTypes,
	type Query,
	QueryBuilder,
	type QueryBuilderOptions,
} from "workers-qb";

export class DBMSQB extends QueryBuilder<{}> {
	public db: any;
	loggerWrapper = asyncLoggerWrapper;

	constructor(db: any, options?: QueryBuilderOptions) {
		super(options);
		this.db = db;
	}

	async execute(query: Query) {
		return await this.loggerWrapper(query, this.options.logger, async () => {
			const result = await this.db.sql({
				query: query.query,
				arguments: query.arguments,
			});

			if (
				query.fetchType === FetchTypes.ONE ||
				query.fetchType === FetchTypes.ALL
			) {
				return {
					// changes: resp.meta?.changes,
					// duration: resp.meta?.duration,
					// last_row_id: resp.meta?.last_row_id,
					// served_by: resp.meta?.served_by,
					// meta: resp.meta,
					// success: resp.success,
					results:
						query.fetchType === FetchTypes.ONE && result.results.length > 0
							? result.results[0]
							: result.results,
				};
			}

			return null;
		});
	}
}

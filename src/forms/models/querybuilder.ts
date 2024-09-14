import {
	FetchTypes,
	type Query,
	QueryBuilder,
	type QueryBuilderOptions,
} from "workers-qb";

// TODO: import this from lib
export async function asyncLoggerWrapper<Async extends boolean = true>(
	query: Query<any, Async> | Query<any, Async>[],
	loggerFunction: CallableFunction | undefined,
	innerFunction: () => any,
) {
	const start = Date.now();
	try {
		return await innerFunction();
	} catch (e) {
		throw e;
	} finally {
		if (loggerFunction) {
			if (Array.isArray(query)) {
				for (const q of query) {
					await loggerFunction(q.toObject(), { duration: Date.now() - start });
				}
			} else {
				await loggerFunction(query.toObject(), {
					duration: Date.now() - start,
				});
			}
		}
	}
}

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
						query.fetchType === FetchTypes.ONE && result.length > 0
							? result[0]
							: result,
				};
			}

			return null;
		});
	}
}

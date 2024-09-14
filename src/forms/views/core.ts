import type { RequestProperties } from "../../bindings";
import { DBMSQB } from "../models/querybuilder";
import { getConfigDatabase } from "../../dbms/configs";

export function fwrapper(view) {
	return async (c) => {
		// console.log(c)

		return new view({
			request: c.req,
			env: c.env,
			ctx: {
				executionContext: c.ctx,
				qb: new DBMSQB(await getConfigDatabase(c.env)),
			},
			params: c.req.param(),
		} as RequestProperties).handle();
	};
}

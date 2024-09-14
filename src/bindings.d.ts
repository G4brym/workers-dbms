import {DBMSDO} from "./dbms";
import {DBMSQB} from "./forms/models/querybuilder";

export type Env = {
	DBSM_DO: DurableObjectNamespace<DBMSDO>;
};

export interface Context {
	executionContext: ExecutionContext;
	qb: DBMSQB;
}

export interface RequestProperties {
	request: Request,
	env: Env,
	ctx: Context
	params: Record<string, any>
}

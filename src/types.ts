import {z} from "zod";

export const databaseIdField = z
  .string()
  .regex(/^[a-z0-9_]+(?:-[a-z0-9_]+)*$/, "not valid ID format")
  .min(4)
  .max(32);


export type Primitive = string | number | boolean | null | bigint
export type DOSqlQuery = {
	query: string
	arguments?: Array<Primitive>
	// arrayMode?: boolean  // default off TODO
	// fullResults?: boolean  // TODO
}

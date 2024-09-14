import { b } from "./builder/base";
import type { baseModel } from "./base";

export const Database: baseModel = {
	tableName: "databases",
	name: "database",
	pluralName: "databases",

	fields: {
		id: b.slug().min(4).max(32).verbose_name("database id"),
		created_at: b.datetime().auto(),
		updated_at: b.datetime().auto(),
	},
};

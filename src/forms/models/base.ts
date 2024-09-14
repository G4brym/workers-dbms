import type { BaseField } from "./builder/base";

export type baseModel = {
	tableName: string;
	name: string;
	pluralName: string;
	fields: Record<string, typeof BaseField>;
};

import { isSpecificZodType } from "../zod-is-type";
import { type AnyZodObject, z } from "zod";

export function coerceInputs(
	data: Record<string, any>,
	schema: AnyZodObject,
): Record<string, any> | null {
	// For older node versions, searchParams is just an object without the size property
	if (
		data.size === 0 ||
		(data.size === undefined &&
			typeof data === "object" &&
			Object.keys(data).length === 0)
	) {
		return null;
	}

	const params: Record<string, any> = {};
	const entries = data.entries ? data.entries() : Object.entries(data);
	for (let [key, value] of entries) {
		// Query, path and headers can be empty strings, that should equal to null as nothing was provided
		if (value === "") {
			// @ts-ignore
			value = null;
		}

		if (params[key] === undefined) {
			params[key] = value;
		} else if (!Array.isArray(params[key])) {
			params[key] = [params[key], value];
		} else {
			params[key].push(value);
		}

		let innerType;
		if (
			schema &&
			(schema as z.AnyZodObject).shape &&
			(schema as z.AnyZodObject).shape[key]
		) {
			innerType = (schema as z.AnyZodObject).shape[key];
		} else if (schema) {
			// Fallback for Zod effects
			innerType = schema;
		}

		// Soft transform query strings into arrays
		if (innerType) {
			if (
				isSpecificZodType(innerType, "ZodArray") &&
				!Array.isArray(params[key])
			) {
				params[key] = [params[key]];
			} else if (isSpecificZodType(innerType, "ZodBoolean")) {
				const _val = (params[key] as string).toLowerCase().trim();
				if (_val === "on" || _val === "off") {
					params[key] = _val === "on";
				}
			} else if (
				isSpecificZodType(innerType, "ZodNumber") ||
				innerType instanceof z.ZodNumber
			) {
				params[key] = Number.parseFloat(params[key]);
			} else if (
				isSpecificZodType(innerType, "ZodBigInt") ||
				innerType instanceof z.ZodBigInt
			) {
				params[key] = Number.parseInt(params[key]);
			} else if (
				isSpecificZodType(innerType, "ZodDate") ||
				innerType instanceof z.ZodDate
			) {
				params[key] = new Date(params[key]);
			}
		}
	}

	return params;
}

import { z, type ZodType } from "zod";

export type BaseFieldOptions = {
	default: string | number | boolean;
	zodType: ZodType<any>;
	htmlType: "text" | "email" | "number" | "date" | "checkbox";
	auto: boolean;
	verbose_name: string;
	nullable: boolean;
	blank: boolean;
	min: number;
	max: number;
	getFieldHtml: (fieldName: string, options, data?: any) => string;
};

export class BaseField {
	private _options: Partial<BaseFieldOptions> = {
		zodType: z.string(),
		getFieldHtml: (fieldName: string, options, data?: any) => {
			const p = options;
			const value = data || p.default;
			return `<input class="form-control" type="${p.htmlType}" ${value ? `value="${value}"` : ""} ${p.blank !== true ? "required" : ""} name="${fieldName}" id="${fieldName}">`;
		},
	};

	public getVerboseName(): string | undefined {
		return this._options.verbose_name;
	}

	public getFieldHtml(fieldName: string, data) {
		if (this._options.getFieldHtml === undefined) {
			throw new Error("getFieldHtml not defined");
		}

		return this._options.getFieldHtml(fieldName, this._options, data);
	}

	public get(option: string) {
		return this._options[option];
	}

	public getZodField(input: string): ZodType<any> {
		let f = this._options.zodType;

		if (this._options.min) {
			f = f.min(this._options.min);
		}
		if (this._options.max) {
			f = f.max(this._options.max);
		}
		if (this._options.nullable === true) {
			f = f.nullable();
		}
		if (this._options.blank === true) {
			f = f?.optional();
		}

		return f;
	}

	constructor(options: Partial<BaseFieldOptions>) {
		this._options = {
			...this._options,
			...options,
		};
	}

	default(param: BaseFieldOptions["default"]) {
		return new BaseField({
			...this._options,
			default: param,
		});
	}

	htmlType(param: BaseFieldOptions["htmlType"]) {
		return new BaseField({
			...this._options,
			htmlType: param,
		});
	}

	auto(param: BaseFieldOptions["auto"] = true) {
		return new BaseField({
			...this._options,
			auto: param,
		});
	}

	verbose_name(param: BaseFieldOptions["verbose_name"]) {
		return new BaseField({
			...this._options,
			verbose_name: param,
		});
	}

	nullable(param: BaseFieldOptions["nullable"] = true) {
		return new BaseField({
			...this._options,
			nullable: param,
		});
	}

	blank(param: BaseFieldOptions["blank"] = true) {
		return new BaseField({
			...this._options,
			blank: param,
		});
	}

	min(param: BaseFieldOptions["min"]) {
		return new BaseField({
			...this._options,
			min: param,
		});
	}

	max(param: BaseFieldOptions["max"]) {
		return new BaseField({
			...this._options,
			max: param,
		});
	}
}

export class b {
	static string(options?: Partial<BaseFieldOptions>) {
		return new BaseField({
			htmlType: "text",
			...(options || {}),
		});
	}

	static slug(options?: Partial<BaseFieldOptions>) {
		return new BaseField({
			zodType: z
				.string()
				.regex(/^[a-z0-9_]+(?:-[a-z0-9_]+)*$/, "not valid slug"),
			htmlType: "text",
			...(options || {}),
		});
	}

	static number(options?: Partial<BaseFieldOptions>) {
		return new BaseField({
			zodType: z.coerce.number(),
			htmlType: "number",
			...(options || {}),
		});
	}

	static integer(options?: Partial<BaseFieldOptions>) {
		return new BaseField({
			zodType: z.coerce.number().int(),
			htmlType: "number",
			...(options || {}),
		});
	}

	static boolean(options?: Partial<BaseFieldOptions>) {
		return new BaseField({
			zodType: z.coerce.boolean(),
			htmlType: "checkbox",
			getFieldHtml: (fieldName: string, options, data?: any) => {
				const { getFieldHtml, ...safeOptions } = options;
				let field = b
					.string(safeOptions as object)
					.getFieldHtml(fieldName, data);

				if (data === true || data === 1) {
					field = field.replace("<input", `<input checked`);
				}

				return field.replace("form-control", "form-check-input");
			},
			...(options || {}),
		});
	}

	static datetime(options?: Partial<BaseFieldOptions>) {
		return new BaseField({
			zodType: z.coerce.date(),
			htmlType: "date",
			...(options || {}),
		});
	}
}

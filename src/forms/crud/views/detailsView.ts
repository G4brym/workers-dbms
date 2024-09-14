import { TemplateView } from './templateView';
import { baseModel } from '../../models/base';
import { z, ZodError } from 'zod';
import { HttpResponse } from '../../utils/render';
import { engine } from '../../utils/engine';

export class DetailsView extends TemplateView {
	model: baseModel;
	_cached_object: Record<string, any>

	async getQuerySet() {
		return this.props.ctx.qb.select(this.model.tableName)
			.where('id = ?1', this.props.params.id)
	}

	async getQueryResult(): Promise<Record<string, any>> {
		if (!this._cached_object) {
			const obj = (await (await this.getQuerySet()).limit(1).execute()).results

			if (!obj || obj.length === 0) {
				throw new Error('404 object not found') // TODO: better errors
			}

			this._cached_object = obj[0]
		}

		return this._cached_object
	}

	async extraContext(): Promise<object> {
		const obj = await this.getQueryResult()
		return {
			...await super.extraContext(),
			title: `Edit ${obj.name}`,
			fields: this.buildForm(obj),
			object: obj
		};
	}

	async post() {
		const formData = await this.getPostFormData();

		const schema = this.buildValidationSchema();

		let validatedData
		try {
			validatedData = await schema.strict().parseAsync(formData);
		} catch (e) {
			if (e instanceof ZodError) {
				const {fields, ...remaining} = await this.extraContext()

				const output = await this.engine.render(this.templateName, {
					...await this.extraContext(),
					errors: e.issues.map((issue) => {
						return {
							code: issue.code,
							message: issue.message
						}
					})
				});

				return HttpResponse(output)
			}

			throw e
		}

		await this.createObject(validatedData);

		const url = new URL(this.props.request.url);

		return Response.redirect(url.origin + this.baseUrl, 302);
	}

	async getPostFormData() {
		const formData: object = Object.fromEntries(await this.props.request.formData());
		for (const [key, value] of Object.entries(formData)) {
			if (value === '') {
				formData[key] = null;
			}
		}
		return formData;
	}

	async createObject(data) {
		return await this.props.ctx.qb.update({
			tableName: this.model.tableName,
			data: data,
			where: {
				conditions: 'id = ?1',
				params: [this.props.params.id]
			}
		}).execute();
	}

	buildValidationSchema() {
		const fields = {};
		for (const [name, field] of Object.entries(this.model.fields).filter(([key, field]) => field.get('auto') !== true)) {
			fields[name] = field.getZodField();
		}

		return z.object(fields);
	}

	buildForm(data) {
		const fields = [];
		for (const [name, field] of Object.entries(this.model.fields).filter(([key, field]) => field.get('auto') !== true)) {
			fields.push({
				name,
				html: field.getFieldHtml(name, data[name]),
				field: field
			});
		}

		return fields;
	}
}

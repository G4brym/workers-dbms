import { TemplateView } from './templateView';
import { baseModel } from '../../models/base';
import { z, ZodError } from 'zod';
import { HttpResponse } from '../../utils/render';
import { engine } from '../../utils/engine';

export class CreateView extends TemplateView {
	model: baseModel;

	async extraContext(): Promise<object> {
		return {
			...await super.extraContext(),
			title: `Novo ${this.model.name}`,
			fields: this.buildForm()
			// buildForm: this.buildForm
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

		// TODO dynamic redirect
		return Response.redirect(`${url.origin}/`, 302);
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
		return await this.props.ctx.qb.insert({
			tableName: this.model.tableName,
			data: data
		}).execute();
	}

	buildValidationSchema() {
		const fields = {};
		for (const [name, field] of Object.entries(this.model.fields).filter(([key, field]) => field.get('auto') !== true)) {
			fields[name] = field.getZodField();
		}

		return z.object(fields);
	}

	buildForm() {
		const fields = [];
		for (const [name, field] of Object.entries(this.model.fields).filter(([key, field]) => field.get('auto') !== true)) {
			fields.push({
				name: field.getVerboseName() ?? name,
				html: field.getFieldHtml(name),
				field: field
			});
		}

		return fields;
	}
}

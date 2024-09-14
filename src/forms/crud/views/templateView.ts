import { HttpResponse } from "../../utils/render";
import type { NunjucksTemplates } from "./../../templates";
import { engine } from "../../templates";
import type { RequestProperties } from "../../../bindings";

export class TemplateView {
	templateName: string;
	baseUrl: string;
	props: RequestProperties;
	engine: NunjucksTemplates;

	constructor(props: RequestProperties) {
		this.props = props;
		this.engine = engine;
	}

	async handle() {
		const method = this.props.request.method.toLowerCase();

		if (!this[method]) {
			return undefined;
		}

		return this[method]();
	}

	async extraContext() {
		return {
			baseUrl: this.baseUrl,
		};
	}

	async get() {
		const output = this.engine.render(this.templateName, {
			...(await this.extraContext()),
		});

		return HttpResponse(output);
	}
}

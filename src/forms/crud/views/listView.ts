import { TemplateView } from './templateView';
import { baseModel } from '../../models/base';

export class ListView extends TemplateView {
	model: baseModel

	async getQuerySet() {
		return this.props.ctx.qb.select(this.model.tableName)
	}

	async getQueryResult() {
		return (await (await this.getQuerySet()).execute()).results
	}

	async extraContext(): Promise<object> {
		const objectList = await this.getQueryResult()

		return {
			...await super.extraContext(),
			title: `List ${this.model.pluralName}`,
			objectList
		};
	}
}

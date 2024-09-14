import { ListView } from "./views/listView";
import { Database } from "../models/equipments";
import { CreateView } from "./views/createView";
import { DetailsView } from "./views/detailsView";

export class DatabasesList extends ListView {
	templateName = "databases/list.html";
	model = Database;
	baseUrl = "/databases";
}

export class DatabasesCreate extends CreateView {
	templateName = "create.html";
	model = Database;
	baseUrl = "/databases";

	async createObject(data) {
		const result = await super.createObject(data);

		const id = this.props.env.DBSM_DO.idFromName(data.id);
		const stub = this.props.env.DBSM_DO.get(id);
		await stub.setEnabled(1);

		return result;
	}
}

export class DatabasesDetails extends DetailsView {
	templateName = "databases/details.html";
	model = Database;
	baseUrl = "/databases";

	async extraContext(): Promise<object> {
		const result = await super.extraContext();

		const id = this.props.env.DBSM_DO.idFromName(result.object.id);
		const stub = this.props.env.DBSM_DO.get(id);
		const stats = await stub.stats();
		stats.databaseSize = stats.databaseSize / 1024 / 1024;

		const url = new URL(this.props.request.url);

		return {
			...result,
			title: `Manage ${result.object.id}`,
			stats,
			endpoints: {
				https: `${url.origin}/api/v1/databases/${result.object.id}/query`,
			},
		};
	}
}

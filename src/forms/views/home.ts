import { TemplateView } from "../crud/views/templateView";
import { getConfigDatabase } from "../../dbms/configs";

export class HomeView extends TemplateView {
	templateName = "home.html";

	async extraContext(): Promise<{}> {
		const configDB = await getConfigDatabase(this.props.env);
		const databases = await configDB.sql({
			query: "select * from databases",
		});

		console.log(databases);
		return {
			title: "Dashboard",
			databases: databases,
			...super.extraContext(),
		};
	}
}

export class LayoutView extends TemplateView {
	templateName = "layout.html";

	async extraContext(): Promise<{}> {
		return {
			title: "Layout",
			...super.extraContext(),
		};
	}
}

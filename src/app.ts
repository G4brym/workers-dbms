import {Hono} from "hono";
import {buildOpenAPI} from "./api";
import {buildViews} from "./forms";

export function generateApp() {
	const app = new Hono();

	buildOpenAPI(app);
	buildViews(app);

	return app
}

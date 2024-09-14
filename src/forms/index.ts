import {HomeView, LayoutView} from './views/home';
import {fwrapper} from "./views/core";
import {DatabasesCreate, DatabasesDetails, DatabasesList} from "./crud/list";


export function buildViews(app) {
	// app.get('/', fwrapper(HomeView));
	app.get('/', (c) => {
	  return c.redirect('/databases', 302)
	})
	app.get('/databases', fwrapper(DatabasesList));
	app.all('/databases/new', fwrapper(DatabasesCreate));
	app.all('/databases/manage/:id', fwrapper(DatabasesDetails));
	app.get('/layout', fwrapper(LayoutView));

	return app
}

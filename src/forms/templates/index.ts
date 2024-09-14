// https://github.com/jiripospisil/hono-nunjucks/blob/master/src/index.ts
import nunjucks from "nunjucks";
import templates from "../precompiled.mjs";

interface Templates {
	[key: string]: any;
}

interface Globals {
	[key: string]: any;
}

interface Filters {
	[key: string]: (...args: any[]) => any;
}

interface Options {
	templates: Templates;
	filters?: Filters;
	globals?: Globals;
}

// An implementation of a Loader which doesn't probe the file system and compile
// on demand (which wouldn't fly on Cloudflare Workers etc.) but rather does
// just a lookup into a static dictionary.
class PrecompiledLoader extends nunjucks.Loader {
	precompiled: any;

	constructor(compiledTemplates: Templates) {
		super();
		this.precompiled = compiledTemplates;
	}

	getSource(name: string) {
		if (this.precompiled[name]) {
			return {
				src: {
					type: "code",
					obj: this.precompiled[name],
				} as any, // trust bro
				noCache: true,
				path: name,
			};
		}

		throw new Error(`Template "${name}" not found. Make sure to run the precompiler first!`);
	}
}

export class NunjucksTemplates {
	env: nunjucks.Environment;

	constructor(templates: Templates = {}, filters: Filters = {}, globals: Globals = {}) {
		this.env = new nunjucks.Environment(new PrecompiledLoader(templates));

		for (const [name, fn] of Object.entries(filters)) {
			this.env.addFilter(name, fn);
		}

		for (const [name, value] of Object.entries(globals)) {
			this.env.addGlobal(name, value);
		}
	}

	render(template: string, params: any): string {
		return this.env.render(template, params);
	}
}

export const engine = new NunjucksTemplates(templates)

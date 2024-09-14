#!/usr/bin/env node
// https://github.com/jiripospisil/hono-nunjucks/blob/master/src/precompile.ts

import { argv, exit } from "node:process";
import { parse } from "node:path";
import { Environment } from "nunjucks";
import { precompile } from "nunjucks/src/precompile.js";
import { writeFileSync } from "node:fs";

const args = argv.slice(2);

if (args.length != 2) {
	console.error("Usage: hono-nunjucks-precompile src/templates src/compiled.mjs");
	console.error("Note: Do not put the output file to the same directory as the templates (reload cycle)!");
	exit(1);
}

function wrapper(templates) {
	let out = `const templates = {};\n\n`;

	for (const template of templates) {
		// Not sure if there can be any shenanings with the name but better to be
		// safe and stringify the hell out of it.
		const parsed = parse(template.name);
		const origName = JSON.stringify(template.name);
		const name = JSON.stringify(`${parsed.dir.length == 0 ? "" : `${parsed.dir}/`}${parsed.name}${parsed.ext}`);

		out += `//------------- START ${origName} -------------\n`;
		out += `templates[${name}] = (function() {\n${template.template}\n})();\n`;
		out += `//------------- END ${origName} -------------\n\n`;
	}

	out += "export default templates;";

	return out;
}

const output = precompile(args[0], {
	env: new Environment(),
	include: ["\\.html$", "\\.nunjucks", "\\.jinja", "\\.tpl"],
	wrapper: wrapper,
});
writeFileSync(args[1], output);

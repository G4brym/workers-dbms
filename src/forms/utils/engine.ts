export class TemplateEngine {
	templateRetriever: CallableFunction;
	blocks: object;

	constructor(templateRetriever) {
		this.templateRetriever = templateRetriever;
		this.blocks = {};
	}

	async render(templateName, context) {
		const template = await this.templateRetriever(templateName);
		if (!template) {
			throw new Error(`Template "${templateName}" not found`);
		}

		let rendered = template;

		rendered = await this.processExtends(rendered, context);
		rendered = this.processBlocks(rendered, context);
		rendered = this.processVariables(rendered, context);
		rendered = await this.processIfStatements(rendered, context);
		rendered = await this.processForLoops(rendered, context);

		return rendered;
	}

	processVariables(template, context) {
		return template.replace(/\{\{\s*([\w\[\].']+)\s*\}\}/g, (match, key) => {
			const value = this.getValueFromContext(key, context);
			return value !== undefined ? value : match;
		});
	}

	getValueFromContext(key, context) {
		const parts = key.split(".");
		let value = context;

		for (const part of parts) {
			if (value === undefined || value === null) return undefined;

			if (part.includes("[") && part.includes("]")) {
				const [arrayName, indexPart] = part.split("[");
				const index = Number.parseInt(indexPart.replace("]", ""));
				value = value[arrayName][index];
			} else {
				value = value[part];
			}
		}

		return value;
	}

	async processExtends(template, context) {
		const extendsRegex = /\{% extends ['"](.+)['"] %\}/;
		const match = template.match(extendsRegex);
		if (match) {
			const parentTemplate = await this.templateRetriever(match[1]);
			if (!parentTemplate) {
				throw new Error(`Parent template "${match[1]}" not found`);
			}
			this.storeBlocks(template);
			return this.render(match[1], context);
		}
		return template;
	}

	storeBlocks(template) {
		const blockRegex = /\{% block (\w+) %\}([\s\S]*?)\{% endblock %\}/g;
		let match;
		while ((match = blockRegex.exec(template)) !== null) {
			this.blocks[match[1]] = match[2];
		}
	}

	processBlocks(template, context) {
		return template.replace(
			/\{% block (\w+) %\}([\s\S]*?)\{% endblock %\}/g,
			(match, blockName, defaultContent) => {
				return this.blocks[blockName] || defaultContent;
			},
		);
	}

	async processIfStatements(template, context) {
		const ifRegex = /\{% if ([\w\[\].']+) %\}([\s\S]*?)\{% endif %\}/g;
		const promises = [];
		template.replace(ifRegex, (match, condition, content) => {
			promises.push(
				(async () => {
					const conditionMet = this.getValueFromContext(condition, context);
					return conditionMet ? this.processVariables(content, context) : "";
				})(),
			);
			return match;
		});
		const results = await Promise.all(promises);
		return template.replace(ifRegex, () => results.shift());
	}

	async processForLoops(template, context) {
		const forRegex =
			/\{% for (\w+)(?:,\s*(\w+))? in (Object\.(?:keys|values|entries)\(([\w.]+)\)|[\w.]+) %\}([\s\S]*?)(?:\{% empty %\}([\s\S]*?))?\{% endfor %\}/g;

		const processLoop = async (
			match,
			item,
			value,
			iterableOrMethod,
			objectName,
			content,
			emptyContent = "",
		) => {
			let items;
			if (iterableOrMethod.startsWith("Object.")) {
				const obj = this.getValueFromContext(objectName, context);
				if (obj === undefined || obj === null) {
					return this.processVariables(emptyContent, context);
				}
				const method = iterableOrMethod.split(".")[1].split("(")[0];
				items = Object[method](obj);
			} else {
				items = this.getValueFromContext(iterableOrMethod, context);
			}

			if (!items || (Array.isArray(items) && items.length === 0)) {
				return this.processVariables(emptyContent, context);
			}

			const renderedItems = await Promise.all(
				items.map(async (element) => {
					const itemContext = { ...context };
					if (value) {
						// This is for Object.entries() case
						itemContext[item] = element[0];
						itemContext[value] = element[1];
					} else {
						itemContext[item] = element;
					}
					const processedContent = await this.processForLoops(
						content,
						itemContext,
					);
					return this.processVariables(processedContent, itemContext);
				}),
			);
			return renderedItems.join("");
		};

		let result = template;
		let match;
		while ((match = forRegex.exec(template)) !== null) {
			const [
				fullMatch,
				item,
				value,
				iterableOrMethod,
				objectName,
				content,
				emptyContent,
			] = match;
			const processed = await processLoop(
				fullMatch,
				item,
				value,
				iterableOrMethod,
				objectName,
				content,
				emptyContent,
			);
			result = result.replace(fullMatch, processed);
		}

		return result;
	}
}

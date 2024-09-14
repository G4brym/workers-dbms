// import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
// import { RequestProperties } from '../inferfaces';
// import { TemplateEngine } from './engine';

// import manifestJSON from '__STATIC_CONTENT_MANIFEST';
// const assetManifest = JSON.parse(manifestJSON);

export function HttpResponse(content: string) {
	return new Response(content, {
		headers: {
			"content-type": "text/html;charset=UTF-8",
		},
	});
}

// async function retrieveTemplate(props: RequestProperties, templateName: string) {
// 		console.log(templateName)
// 		let templateText;
// 		try {
// 			// @ts-ignore
// 			const resp = await getAssetFromKV(
// 				{
// 					request: new Request(`http://localhost/templates/${templateName}`),
// 					waitUntil: props.ctx.executionContext.waitUntil.bind(props.ctx.executionContext)
// 				},
// 				{
// 					ASSET_NAMESPACE: props.env.__STATIC_CONTENT,
// 					ASSET_MANIFEST: assetManifest
// 				}
// 			);
//
// 			templateText = await resp.text();
// 		} catch (e) {
// 			throw new Error(`Template ${templateName} not found!`);
// 		}
//
// 		return templateText;
// 		//return templateText.replaceAll('\n', '');
// }
//
// export function startEngine(props: RequestProperties) {
//
// 	var NunLoader = nunjucks.Loader.extend({
// 		async: true,
//
// 		getSource: function(name, callback) {
// 			console.log(name)
// 			const template = retrieveTemplate(props, name)
// 			console.log(template)
// 			callback(null, template);
// 		}
// 	});
//
// 	class AsyncDatabaseLoader {
// 		async getSource(name) {
// 			try {
// 				// Simulate fetching the template from a database
// 				const template = await retrieveTemplate(props, name)
//
// 				if (!template) {
// 					return null;
// 				}
//
// 				return {
// 					src: template,
// 					path: name,
// 					noCache: false
// 				};
// 			} catch (error) {
// 				console.error(`Error fetching template "${name}":`, error);
// 				return null;
// 			}
// 		}
// 	}
//
// 	const env = new nunjucks.Environment()
//
// 	async function renderTemplate(name, context) {
// 		return new Promise((resolve, reject) => {
// 			env.render(name, context, (err, result) => {
// 				if (err) reject(err);
// 				else resolve(result);
// 			});
// 		});
// 	}
//
// 	return {
// 		render: renderTemplate
// 	}
// }

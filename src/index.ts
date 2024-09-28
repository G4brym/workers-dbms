export { generateApp } from "./app";
export { DBMSDO } from "./dbms";

//export default generateApp();
// export default {
//   async fetch(request, env, ctx) {
//     if (request.url.endsWith("/websocket")) {
//       // Expect to receive a WebSocket Upgrade request.
//       // If there is one, accept the request and return a WebSocket Response.
//       const upgradeHeader = request.headers.get('Upgrade');
//       if (!upgradeHeader || upgradeHeader !== 'websocket') {
//         return new Response('Durable Object expected Upgrade: websocket', { status: 426 });
//       }
//
//       // This example will refer to the same Durable Object instance,
//       // since the name "foo" is hardcoded.
//       let id = env.DBSM_DO.idFromName("test-do");
//       let stub = env.DBSM_DO.get(id);
//
//       return stub.fetch(request);
//     }
//
//     return new Response(null, {
//       status: 400,
//       statusText: 'Bad Request',
//       headers: {
//         'Content-Type': 'text/plain',
//       },
//     });
//   }
// };

# workers-dbms
Workers Database Management System for Durable Objects


## Features
- On demand SQLite databases (like neon.tech)
- https endpoints to manage and query databases
- Websocket endpoint to query databases


## Connect apps outside Cloudflare to your database
The package [django-d1](https://github.com/G4brym/django-d1) has an experimental backend to use the websocket
endpoint to run django migrations and queries

Example usage in django:
```
DATABASES = {
    'default': {
        'ENGINE': 'django_dbms',
        'WORKERS_DBMS_ENDPOINT': 'wss://workers-dbms.workers.dev/api/v1/databases/django/websocket',
    }
}
```


## Get started

```bash
npm install --save workers-dbms
npm install --save wrangler
```

Create a `index.ts` file with this:
```ts
import { generateApp } from "workers-dbms";
export { DBMSDO } from "workers-dbms";

export default generateApp()
```

Create a `wrangler.toml` file with this:
```toml
#:schema node_modules/wrangler/config-schema.json
name = "workers-dbms"
main = "index.ts"
compatibility_date = "2024-09-28"
# workers_dev = false  # uncomment this for enhanced security !

[[durable_objects.bindings]]
name = "DBSM_DO"
class_name = "DBMSDO"

[[migrations]]
tag = "v1"
new_sqlite_classes = ["DBMSDO"]
```

Deploy your dbms with wrangler:
```bash
wrangler deploy
```

You can now access your dbms on the worker deployed url

There is also a swagger interface with all the endpoints documented at `/api` path.


## FAQ

### Handshake status 426 Upgrade Required

When using a custom domain for your worker, make sure to enable WebSockets on the domain Network configuration,
otherwise you will not be able to use the websocket endpoint!

![enable websockets](https://github.com/G4brym/workers-dbms/raw/main/docs/enable-websockets.png)


### Anyone can access my databases

1. For secure databases, you should uncomment the `workers_dev = false` line in your `wrangler.toml`
2. Create a custom domain for your worker [docs here](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/#add-a-custom-domain)
3. Setup zero trust for this worker [docs here](https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/self-hosted-apps/)


## Images

Home page
![homepage](https://github.com/G4brym/workers-dbms/raw/main/docs/home-page.png)

Database details
![homepage](https://github.com/G4brym/workers-dbms/raw/main/docs/database-details.png)

API Documentation with swagger
![homepage](https://github.com/G4brym/workers-dbms/raw/main/docs/swagger.png)

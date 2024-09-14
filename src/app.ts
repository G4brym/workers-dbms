import {Hono} from "hono";
import {Env} from "./bindings";
import {buildOpenAPI} from "./api";
import {buildViews} from "./forms";

export const app = new Hono<Env>()

buildOpenAPI(app)
buildViews(app)

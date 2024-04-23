import { Hono } from "hono";
import { Bindings } from "./bindings";
import { endpoints as galleryV1Endpoints } from "./gallery/v1/endpoints";
import { Content as IndexContent } from "./index";

const app = new Hono<{ Bindings: Bindings }>();
export default app;

app.use(async (c, next) => {
    await next();
    if (c.error) {
        c.body(`error: ${c.error}`);
    }
});

app.get("/", (c) => c.html(IndexContent()));
app.route("/gallery/v1", galleryV1Endpoints);

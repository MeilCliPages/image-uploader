import { Hono } from "hono";
import { Bindings } from "./../../../../bindings";
import { getPrismaClient, getKey, getBlobUrl } from "./../../utils";

export const endpoints = new Hono<{ Bindings: Bindings }>();

endpoints.get("/:key{.+$}", async (c) => {
    const { key } = c.req.param();
    const object = await c.env.IMAGE_R2.get(key);
    if (object == null) {
        return c.notFound();
    }

    object.writeHttpMetadata(c.res.headers);
    c.res.headers.set("etag", object.httpEtag);

    return c.body(object.body);
});

endpoints.delete("/:key{.+$}", async (c) => {
    const { key } = c.req.param();
    await c.env.IMAGE_R2.delete(key);
    const object = await c.env.IMAGE_R2.get(key);
    if (object == null) {
        return c.notFound();
    }

    object.writeHttpMetadata(c.res.headers);
    c.res.headers.set("etag", object.httpEtag);

    return c.text("success");
});

endpoints.post("/", async (c) => {
    const body = await c.req.parseBody();
    const file = body["file"] as File | "undefined";
    const uuid = body["uuid"] as string;
    const filename = body["filename"] as string;
    if (file == "undefined") {
        return c.notFound();
    }

    const prisma = getPrismaClient(c);
    await prisma.galleryV1Blob.upsert({
        where: { uuid_filename: { uuid, filename } },
        update: {},
        create: {
            filename,
            gallery: {
                connectOrCreate: {
                    where: { uuid },
                    create: { uuid },
                },
            },
        },
    });

    const response = await c.env.IMAGE_R2.put(getKey(uuid, filename), await file.arrayBuffer(), {
        httpMetadata: {
            contentType: file.type,
        },
    });
    return c.json({ url: getBlobUrl(c, response.key) });
});

import { Hono } from "hono";
import { Bindings } from "../../../bindings";
import { GalleryV1 } from "./../entity";
import { uuidRegex, getPrismaClient, getKey, getBlobUrl } from "./../utils";
import { endpoints as listEndpoints } from "./list";
import { endpoints as blobEndpoints } from "./blob";

export const endpoints = new Hono<{ Bindings: Bindings }>();

endpoints.route("/list", listEndpoints);
endpoints.route("/blob", blobEndpoints);

endpoints.get(`/:uuid{${uuidRegex}}`, async (c) => {
    const prisma = getPrismaClient(c);
    const { uuid } = c.req.param();
    console.log(`uuid: ${uuid}`);

    const item = await prisma.galleryV1.findFirst({
        where: {
            uuid,
        },
        select: {
            uuid: true,
            createdAt: true,
            blobs: {
                select: {
                    filename: true,
                },
                orderBy: {
                    filename: "desc",
                },
            },
        },
    });

    if (item == null) {
        return c.notFound();
    }

    const itemResult: GalleryV1 = {
        uuid: item.uuid,
        createdAt: item.createdAt.toISOString(),
        blobs: item.blobs.map((y) => {
            return {
                url: getBlobUrl(c, getKey(item.uuid, y.filename)),
            };
        }),
    };
    return c.json(itemResult);
});

endpoints.delete(`/:uuid{${uuidRegex}}`, async (c) => {
    const prisma = getPrismaClient(c);
    const { uuid } = c.req.param();

    const isExsisting = await prisma.galleryV1.findUnique({ where: { uuid } });
    if (isExsisting == null) {
        return c.notFound();
    }

    const item = await prisma.galleryV1.delete({
        where: {
            uuid,
        },
        select: {
            uuid: true,
            createdAt: true,
            blobs: {
                select: {
                    filename: true,
                },
                orderBy: {
                    filename: "desc",
                },
            },
        },
    });

    for (const blob of item.blobs) {
        await endpoints.request(`/blob/${getKey(item.uuid, blob.filename)}`, { method: "DELETE" }, c.env);
    }

    return c.text("success");
});

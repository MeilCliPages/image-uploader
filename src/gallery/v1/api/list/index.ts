import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Bindings } from "./../../../../bindings";
import { GalleryV1, ListResponse } from "./../../entity";
import { getPrismaClient, getKey, getBlobUrl } from "./../../utils";

export const endpoints = new Hono<{ Bindings: Bindings }>();

endpoints.get(
    "/",
    zValidator(
        "query",
        z.object({
            page: z.coerce.number().int().positive().optional(),
            count: z.coerce.number().int().positive().optional(),
        }),
    ),
    async (c) => {
        const prisma = getPrismaClient(c);
        const query = c.req.valid("query");
        const page = query.page ?? 1;
        const count = query.count ?? 20;

        const [total, items] = await prisma.$transaction([
            prisma.galleryV1.count(),
            prisma.galleryV1.findMany({
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
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * count,
                take: count,
            }),
        ]);
        const itemsResult: GalleryV1[] = items.map((x) => {
            return {
                uuid: x.uuid,
                createdAt: x.createdAt.toISOString(),
                blobs: x.blobs.map((y) => {
                    return {
                        url: getBlobUrl(c, getKey(x.uuid, y.filename)),
                    };
                }),
            };
        });
        const result: ListResponse<GalleryV1> = {
            total,
            maxPage: Math.ceil(total / count),
            currentPage: page,
            items: itemsResult,
        };

        return c.json(result);
    },
);

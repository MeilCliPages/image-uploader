import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Bindings } from "./../../bindings";
import { uuidRegex, createLocalDateStringConverter } from "./utils";
import { GalleryV1, ListResponse } from "./entity";
import { endpoints as apiEndpoints } from "./api";
import { Content as IndexContent } from "./index";
import { Content as UploadContent } from "./upload";
import { Content as DetailContent } from "./detail";

export const endpoints = new Hono<{ Bindings: Bindings }>();

endpoints.route("/api", apiEndpoints);

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
        const query = c.req.valid("query");
        const page = query.page ?? 1;
        const count = query.count ?? 20;
        const response = await endpoints.request(`/api/list?page=${page}&count=${count}`, undefined, c.env);
        const listResponse = await response.json<ListResponse<GalleryV1>>();
        const localDateStringConverter = createLocalDateStringConverter(c);
        return c.html(
            IndexContent({
                maxPage: listResponse.maxPage,
                currentPage: listResponse.currentPage,
                count,
                galleryV1List: listResponse.items,
                localDateStringConverter,
            }),
        );
    },
);

endpoints.get("/upload", (c) => c.html(UploadContent()));

endpoints.get(`/detail/:uuid{${uuidRegex}}`, async (c) => {
    const { uuid } = c.req.param();
    const response = await endpoints.request(`/api/${uuid}`, undefined, c.env);
    const detailResponse = await response.json<GalleryV1>();
    const localDateStringConverter = createLocalDateStringConverter(c);
    return c.html(
        DetailContent({
            galleryV1: detailResponse,
            localDateStringConverter,
        }),
    );
});

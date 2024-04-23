import { Context } from "hono";
import { accepts } from "hono/accepts";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { Bindings } from "../../bindings";

// FixMe: hono cann't parse { and }, so repeat \\w
export const uuidRegex = `${"\\w".repeat(8)}-${"\\w".repeat(4)}-${"\\w".repeat(4)}-${"\\w".repeat(4)}-${"\\w".repeat(12)}`;

export function getPrismaClient(c: Context<{ Bindings: Bindings }>): PrismaClient {
    const adapter = new PrismaD1(c.env.IMAGE_D1);
    return new PrismaClient({ adapter });
}

export function getKey(uuid: string, filename: string): string {
    return `gallery/v1/${uuid}/${filename}`;
}

export function getBlobUrl(c: Context<{ Bindings: Bindings }>, key: string): string {
    if (c.env.IS_LOCAL_DEV == "true") {
        return `/gallery/v1/api/blob/${key}`;
    } else {
        return `https://${c.env.IMAGE_HOST}/${key}`;
    }
}

export function createLocalDateStringConverter(c: Context<{ Bindings: Bindings }>): (dateString: string) => string {
    const acceptLanguage = accepts(c, {
        header: "Accept-Language",
        supports: [],
        default: "ja-JP",
        match: (accepts, config) => {
            return accepts.sort((a, b) => b.q - a.q)?.at(0)?.type ?? config.default;
        },
    });
    return (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(acceptLanguage, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
    };
}

# Change D1
This image uploader is using [Prisma](https://www.prisma.io/) for SQLite ORM.
So we need to create migration file if change database.

1. Create empty migration sql file: `npx wrangler d1 migrations create DB_NAME MIGRATION_NAME`
1. Generate migration sql: `npx prisma migrate diff --script --from-empty --to-schema-datamodel ./prisma/schema.prisma --output PATH_TO_MIGRATION_FILE`
1. And do the [Migrate D1](./migrate-d1.md).
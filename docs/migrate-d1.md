# Migrate D1
On initialize or updating, D1 needs to execute migration.

1. Apply migration to local DB: `npx wrangler d1 migrations apply DB_NAME --local`
1. Generate DB Client: `npx prisma generate`
1. Apply migration to remote DB: `npx wrangler d1 migrations apply DB_NAME --remote`
# Configure D1
[D1](https://www.cloudflare.com/developer-platform/d1/) is serverless SQLite service.
This image uploader manage image object information on D1

## Create new database
1. Open the Cloudflare dashboard.
1. Click `Workers & Pages` and then click `D1` on sidebar.
1. Create new database.
1. Open `wrangler.toml`, and write database name and database id.

## Setup database tables
D1 is SQLite, so you need to set up tables.

The setup flow equals to [Migrate D1](./migrate-d1.md). So see that.
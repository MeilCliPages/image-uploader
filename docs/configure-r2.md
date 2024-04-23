# Configure R2
[R2](https://www.cloudflare.com/developer-platform/r2/) is S3 like storage.
This image uploader puts the image on R2.

## Create new bucket
1. Open the Cloudflare dashboard.
1. Click `R2` on sidebar.
1. Create bucket.
1. Open `wrangler.toml`, and write bucket name.

## Set up custom domain
1. Open bucket page.
1. Go to `Settings`
1. Connect your domain
1. Open `wrangler.toml`, and write image hosting domain to `IMAGE_HOST`.
1. And change R2.dev subdomain to disable.
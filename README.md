# image-uploader
This is image uploader of @MeilCli private usage. And @MeilCli still continue to implement this.

## Concepts
- Low price image uploader & image hosting
- May free if the site access is few (excepting domain price)
- Can upload image only admin
- Can access image everyone
- Can host the own domain
- Can upload image with variants

## Requirements
- Have a Cloudflare account
- Have domain on Cloudflare
- Register payment method on Cloudflare
- Authenticated wrangler

## Price information
- Cloudflare Workers: https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare R2: https://developers.cloudflare.com/r2/pricing/
- Cloudflare D1: https://developers.cloudflare.com/d1/platform/pricing/

## Getting started
### Quick look this image uploader
Clone this repository & execute below commands
```sh
npm install
npx wrangler d1 migrations apply d1-example-com --local
npm run generate
npm run dev
```

### Use this image uploader
1. Clone or fork this repository
1. Execute `npm install`
1. [Configure Worker](./docs/configure-worker.md)
1. [Configure R2](./docs/configure-r2.md)
1. [Configure D1](./docs/configure-d1.md)
1. [Configure access restriction](./docs/configure-access-restriction.md)
1. [Configure cache rule](./docs/configure-cache-rule.md)
1. Do debug, execute `npm run dev`
1. Deploy your worker, execute `npm run deploy`

If you want to manage deployment code on private repository, see [Private management](./docs/private-management.md)

## Development documents
- [Change D1](./docs/change-d1.md)

## License
MIT License

### Using libraries on Worker side
|Library|License|
|:--|:--|
|[hono](https://github.com/honojs/hono)|MIT License|
|[@hono/zod-validator](https://github.com/honojs/middleware/tree/main/packages/zod-validator)|MIT License|
|[zod](https://github.com/colinhacks/zod)|MIT License|
|[prisma](https://github.com/prisma/prisma)|Apache License v2|

### Using libraries on Frontend side
|Library|License|
|:--|:--|
|[Bootstrap](https://github.com/twbs/bootstrap)|MIT License|
|[bs-custom-file-input](https://github.com/Johann-S/bs-custom-file-input)|MIT License|
|[Compressor.js](https://github.com/fengyuanchen/compressorjs)|MIT License|
|[clipboard.js](https://github.com/zenorocha/clipboard.js)|MIT License|
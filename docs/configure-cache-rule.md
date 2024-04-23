# Configure cache rule
The R2 response feel slowly when cache isn't fit.
On browser, by using development mode, it can look `Waiting for Server response` time is long.

So, this explanation is one of improvement cache hit strategy.

## Set up more Edge TTL
Cloudflare can set the Edge TTL on the [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/).
Therefore, in this document, guide the Edge TTL setting.

1. Open the Cloudflare dashboard.
1. Click `Websites` on sidebar.
1. Click the image hosting domain.
1. Click `Caching` and then click `Cache Rules` on sidebar. 
1. Create new rule.
   - `When incoming requests match...`:
     - Field: `Hostname`, Operator: `equals`, Value: your image hosting domain
     - `And`
     - Field: `File extension`, Operator: `is in`, Value: `png`, `jpg` and `webp`
   - `Cache eligibility`:
     - `Eligible for cache`
   - `Edge TTL`:
     - `Ignore cache-control header and use this TTL`
     - And set the `1 year`
1. Click `Deploy` button.
1. Go back to cache rules list page.
1. Change the rule to enabled.
   - Maybe, the default is disabled.

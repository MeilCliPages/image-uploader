# Configure access restriction
This worker doesn't implement authentication system.
Because uploader site is based on domain level access restriction.

## Set up domain level access restriction
1. Open the Cloudflare dashboard.
1. Click `Zero Trust` on sidebar.
1. Click `Settings` on sidebar.
1. Click `Authentication`.
1. Add your prefer Login Method.
   - ref: https://developers.cloudflare.com/cloudflare-one/identity/idp-integration
   - You can use GitHub Login!
1. Click `Access` and then click `Applications` on sidebar.
1. Click `Add an application`.
1. Select `Self-hosted`.
1. Input the name and prefer session duration.
1. Input your uploader hosting domain.
1. On `Identity providers` section, change `Accept all available identity providers` to disable.
   - And select your prefer Login Method.
1. Go to Next.
1. Configure policy
   - Policy action: `Allow`
   - Configure rules:
     - Include
       - Selector: `Login Methods`, Value: your prefer Login Method
     - Require
       - Selector: `Emails`, Value: your email that setting in Login Method provider
1. Go to Next.
1. Click `Add application`

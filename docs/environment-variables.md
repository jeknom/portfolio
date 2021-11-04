[Back to main](../README.md)

# ⚙️ Example environment variables

```
# .env

# Cert variables
SSL_CERT_DIRECTORY_PATH=/etc/letsencrypt/live/<your-domain>
SSL_CERT_KEY_FILENAME=privkey.pem
SSL_CERT_FILENAME=cert.pem
SSL_CERT_BUNDLE_FILENAME=chain.pem

# Database variables
MYSQL_DATABASE=portfolio-db
MYSQL_ROOT_PASSWORD=<your-password>

# This needs to match to the above
DATABASE_URL="mysql://root:<MYSQL_ROOT_PASSWORD>@db/<MYSQL_DATABASE>"

# Auth variables
NEXTAUTH_URL=<YOUR-SITE-URL (localhost:3000 if running locally)>
AUTH_CLIENT_ID=<YOUR-GOOGLE-OAUTH-CLIENT-ID>
AUTH_CLIENT_SECRET=<YOUR-GOOGLE-OAUTH-CLIENT-SECRET>

# Turn this on to debug authentication
DEBUG=true
```

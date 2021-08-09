# Portfolio

## Prerequisites

- [Docker](https://www.docker.com/) installed.

## Setting up for production

1. Create a directory for the portfolio.
2. Inside that directory, create directories certs and database.
3. Generate your [SSL certificates](https://www.cloudflare.com/en-gb/learning/ssl/what-is-an-ssl-certificate/) and place them in the certs directory.
4. Add a .env file inside the portfolio directory and follow the example below to fill it out.

```
# .env

# Cert variables require the absolute path
SSL_CERT_KEY_PATH=
SSL_CERT_PATH=
SSL_CERT_BUNDLE_PATH=

# Database variables
MYSQL_DATABASE=
MYSQL_ROOT_PASSWORD=
MYSQL_USER=
MYSQL_PASSWORD=
```

4. Add a [docker-compose](https://docs.docker.com/compose/).prod.yml file inside the portfolio directory and use [this file](docker-compose.prod.yml) as an example.
5. Open a terminal window, navigate to the portfolio directory and run the app with `docker-compose up` command.
6. If you used the example docker-compose file, the app will also launch an [adminer](https://www.adminer.org/) container. You can use this to initialize the database. Use [this schema](db-schema.sql) to do the initialization.
7. Use adminer to fill the database with your data.

## Missing from this readme

- How to access adminer.
- Setting up a development environment.
- Nginx setup.

# Database and migrations

The portfolio uses a MySQL as its database and Prisma for ORM.

## Initialization

1. Connect to the app container with `docker exec -it <your-container-id> sh`.
2. Depending on your environment, you will need to run migrations as follows:

- Development: `npx prisma migrate dev`.
- Production: `npx prisma migrate deploy`.
- For more details, refer to the [Prisma documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate) on migrations.

3. Run `npm run seed`. This will initialize the database with some placeholder data. You can also modify this by altering [the seed script](../app/prisma/seed.ts)

- For more details, refer to the [Prisma documentation](https://www.prisma.io/docs/guides/database/seed-database) on seeding.

### Note

- You can also do custom .sql initialization scripts for when the database is first created. To do this, place the files in [../database/initialization](../database/initialization) before starting the database.

## Viewing and making changes

The docker compose file sets up an adminer service which can be used to view and edit the contents of the database easily. To open adminer, run the portfolio app and open http://your-domain:8080 on your favorite browser. You can login using the credentials you wrote down in the [.env](environment-variables) file.

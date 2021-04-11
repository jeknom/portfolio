# Portfolio

Here is the code I use to run my portfolio on. It's a [next.js](https://nextjs.org/) app with a [SQLite](https://www.sqlite.org/index.html) database for holding all the relevant information.

## Building and deploying

1. Clone this repository.
2. Run `npm install` inside the project directory.
3. Run `npm run build` or `npx next build` inside the project directory.
4. Copy the `.next`, `public` folder and `package.json` into a new empty directory of your choosing.
5. If you have not created one already, create a SQLite database inside the new empty directory. Use the `db-schema.sql` in the root of the project directory to initialize the database.
6. Create a `.env.local` file next to your database file and copy + paste the following:

```
ENVIRONMENT="dev"
SQLITE_DATABASE_PATH="/portfolio.db"
```

7. Upload the folder you created to your host. I recommend zipping the file to avoid long upload times.
8. Once you have the folder on your host, run `npm install` inside of it.
9. Next up, run `npx next start`. The server should now be running and the app visible behind port 3000.

Optionally, you can set up a service on Ubuntu to automatically run/restart the app:

- Create a user called portfolio.
- Check Google how to create a service using `systemctl`.
- For the service file, this is what I used:

```
[Unit]
Description=Portfolio

[Service]
Type=simple
User=portfolio
WorkingDirectory=/home/portfolio/portfolio-build
ExecStart=/usr/bin/npx next start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

## Todo

- As of yet, the environment variable is not important. This should be improved.
- Make a custom build script for setting up the files automatically.
- Simplify the Timeline page by dividing it into smaller components.

[Back to main](../README.md)

## 🏭 Setting up for production

### Prerequisites

- Running instance of Ubuntu server.
- Static IP address assigned to that instance.
- Domain name with records pointing to the static IP address.
- Ports for HTTP (80), HTTPS (443) and adminer (8080) open on that instance.

### Steps

1. Connect to your instance and run [this initialization script](../scripts/init-ubuntu.sh) with sudo privileges.
2. Fill in any details required while running this script. The script will ask for following input:
   - Permission for installing docker and compose (y/n).
   - Credentials for a new portfolio user.
   - Details for generating SSL certificates ([Certbot](https://certbot.eff.org/)).
3. Switch over to the new portfolio user `sudo su portfolio` and navigate to `/home/portfolio`.
4. Create Google oAuth client credentials. You can follow [this tutorial](https://dev.to/ndom91/adding-authentication-to-an-existing-serverless-next-js-app-in-no-time-with-nextauth-js-192h) to set them up easily. There's also a lot of instructions on how to setup next-auth in next.js. You can ignore those instructions, but it will give you an idea on how authentication works in this portfolio.
5. Open the .env file with your favorite text editor and fill in the environment variables by following the [example here](environment-variables.md).
6. Run the portfolio with `docker-compose -f docker-compose.prod.yml up`.
7. Connect to the app container and initialize the database by following [these instructions](database-and-migrations.md#Initialization).
8. If everything has been set up correctly, the portfolio should now be up and running on your domain.

# Portfolio

[![Generic badge](https://img.shields.io/github/last-commit/jeknom/portfolio)](https://github.com/jeknom/portfolio/commits/main)
[![Generic badge](https://img.shields.io/badge/Demo-https%3A%2F%2Fjohku.org-green)](https://johku.org/)

This is the repository for my portfolio app. The front is a Next.js app which relies on a MySQL database for storage. This app is also dockerized to make it convenient to set up.

## Setting up for development

### Prerequisites

- Git installed.
- Node installed.
- Docker installed.

### Steps

1. Clone this repository.
2. Run `npm i` inside the app directory.
3. Create a directory called "container" inside the database directory.
4. Create a .env file at the root of the cloned directory and follow the example at the bottom of this page to fill it out. You can skip the ssl certificate variables as they are not used in the development environment.
5. Run the app with `docker-compose up`.
6. If everything is set up correctly, the portfolio will appear on http://localhost:3000. Make any changes to the app's code and you should see hot reload reacting to it.

## Setting up for production

### Prerequisites

- Running instance of Ubuntu server.
- Static IP address assigned to that instance.
- Domain name with records pointing to the static IP address.
- Ports for HTTP (80), HTTPS (443) and adminer (8080) open on that instance.

### Steps

1. Connect to your instance and run [this initialization script](init-ubuntu.sh) with sudo privileges.
2. Fill in any details required while running this script. The script will ask for following input:
   - Permission for installing docker and compose (y/n).
   - Credentials for a new portfolio user.
   - Details for generating SSL certificates ([Certbot](https://certbot.eff.org/)).
3. Switch over to the new portfolio user `sudo su portfolio` and navigate to `/home/portfolio`.
4. Open the .env file with your favorite text editor and fill in the environment variables by following the example below.
5. Run the portfolio with `docker-compose -f docker-compose.prod.yml up`.
6. If everything has been set up correctly, the portfolio should now be up and running on your domain.

## Example environment variables

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
MYSQL_USER=admin
MYSQL_PASSWORD=<your-password>
```

## Tips

<a name="tips"></a>

- You can edit the data in the portfolio by accessing its database via adminer. To open adminer, go to http://your-domain:8080. You can login using the credentials you wrote down in the .env file.

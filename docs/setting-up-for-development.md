[Back to main](../README.md)

## 🧑‍💻 Setting up for development

### Prerequisites

- Git installed.
- Node installed.
- Docker installed.

### Steps

1. Clone this repository.
2. Run `npm i` inside the app directory.
3. Create a directory called "container" inside the database directory.
4. Create Google oAuth client credentials. You can follow [this tutorial](https://dev.to/ndom91/adding-authentication-to-an-existing-serverless-next-js-app-in-no-time-with-nextauth-js-192h) to set them up easily. There's also a lot of instructions on how to setup next-auth in next.js. You can ignore those instructions, but it will give you an idea on how authentication works in this portfolio.
5. Create a .env file at the root of the cloned directory and follow the [example here](environment-variables.md) to fill it out. You can skip the ssl certificate variables as they are not used in the development environment.
6. Run the app with `docker-compose up`.
7. Connect to the app container and initialize the database by following [these instructions](database-and-migrations.md#Initialization).
8. If everything is set up correctly, the portfolio will appear on http://localhost:3000. Make any changes to the app's code and you should see hot reload reacting to it.

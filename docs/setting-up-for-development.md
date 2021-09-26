## Setting up for development

### Prerequisites

- Git installed.
- Node installed.
- Docker installed.

### Steps

1. Clone this repository.
2. Run `npm i` inside the app directory.
3. Create a directory called "container" inside the database directory.
4. Create a .env file at the root of the cloned directory and follow the [example here](environment-variables.md) to fill it out. You can skip the ssl certificate variables as they are not used in the development environment.
5. Run the app with `docker-compose up`.
6. Connect to the app container and initialize the database by following [these instructions](database-and-migrations.md#Initialization).
7. If everything is set up correctly, the portfolio will appear on http://localhost:3000. Make any changes to the app's code and you should see hot reload reacting to it.

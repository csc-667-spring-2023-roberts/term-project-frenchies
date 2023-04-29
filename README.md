# Frenchies Project

## How To ?

### Set up the project

Install the required dependencies using the following command:
```shell
npm i
```

Then, copy the `.envrc.example` file in a new `.envrc` file:
```shell
cp .envrc.example .envrc
```

And update the required variables with proper data (passwords for example).

### Create a new migration in the database

Run the following command, which will create a new migration file in the `migrations` directory:
```shell
npm run db:create <MIGRATION_NAME>
```

### Apply the migrations

As easy as just running:
```shell
npm run db:migrate
```

### Clean the database

If you ever need to clean up the database, run the following command:
```shell
docker volume rm term-project-frenchies_postgres-db
```

### Start the project

Before running any of the following commands, set up your environment using a `.envrc` file.
You can create this file by duplicating the `.envrc.example` file provided by default.
If you have `direnv` installed on your computer, it's as easy as running:
```shell
# Highly recommended
direnv allow

# Otherwise, export the variables using source
source .envrc
```

Using docker, you can start the database in one command:
```shell
docker compose up
```

Then, apply the migrations using the command from the previous section.
Finally, start the backend service using the following command:
```shell
npm run start:dev
```

Don't forget to clean up the resources once done !
```shell
docker compose down
```

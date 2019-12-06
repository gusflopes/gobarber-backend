# gobarber-backend
GoBarber Backend on Node.js - Developed during Rocketseat Bootcamp GoStack

## Starting the Project
### Initial Setup
After cloning the project, follow these commands:
```
yarn # Install dependencies
docker-compose up -d # Build/Start All Services
yarn sequelize db:create # Create the GoBarber Database if not already crated
yarn sequelize db:migrate # Migrations
yarn sequelize db:seed:all # Seed to create 2 users - only use in Development
```

The project should be ready for startup with 3 services running on Docker Containers (Postgres, Redis and Mongo)

### Start/Stop
With the services running you can the following commands:

```
yarn dev # Start the API
yarn queue # Start the Queue for the Mailer Service
```

The services can be started/stopped using `docker-compose`:
```
docker-compose start -d # Start all the services
docker-compose stop # Stop all the services
```

Using debug if needed: `yarn dev:debug`


## Dependencies
### Project Dependencies
- Express
- Sequelize
- Mongoose
- bee-queue

- Jsonwebtoken
- Yup
- Multer
- Nodemailer
- Youch
- dotenv
- @sentry/node

Utils:
- pg pg-hstore
- express-async-errors
- express-handlebars
- date-fns
- brcryptjs
- nodemailer-express-handlebars

### Development Dependencies
- Nodemon: auto-restart the server when a file is saved
- Sucrase: converts EcmaScript to Javascript, allowing to use ES on the app;
- Sequelize-cli
- ESLint
- Prettier
- eslint-config-airbnb-base eslint-config-prettier
- eslint-plugin-import eslint-plugin-prettier


## Sequelize
- Create migrations: `yarn sequelize migration:create --name=create-users`

- Migrate: `yarn sequelize db:migrate`
- Undo Last Migration: `yarn sequelize db:migrate:undo`
- Undo All Migrations`yarn sequelize db:migrate:undo:all`

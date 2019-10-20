# gobarber-backend
GoBarber Backend on Node.js - Developed during Rocketseat Bootcamp GoStack

## Starting the Project
### Configure Docker
```
docker run --name database -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -d postgres:11`
docker run --name mongobarber -p 27017:27017 -d -t mongo
docker run --name redis -p 6379:6379 -d -t redis:alpine

```

### Starting the project
Docker:
```
docker start database
docker start mongobarber
docker start redis
```

Servers:
```
yarn dev
yarn queue
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

# gobarber-backend
GoBarber Backend on Node.js - Developed during Rocketseat Bootcamp GoStack

## Installing the project
Docker: `docker run --name database -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -d postgres:11`

Sequelize: `yarn sequelize db:migrate`

## Sequelize
- Create migrations: `yarn sequelize migration:create --name=create-users`
- Migrate: `yarn sequelize db:migrate`
- Undo Last Migration: `yarn sequelize db:migrate:undo`
- Undo All Migrations`yarn sequelize db:migrate:undo:all`


## Running the project
Docker: `docker start database`

Dev: `yarn dev`
Dev Debug:  `yarn dev:debug`


## Dependencies
- Express

## Dev Dependencies
- Sucrase: converts EcmaScript to Javascript, allowing to use ES on the app;
- Nodemon: auto-restart the server when a file is saved;

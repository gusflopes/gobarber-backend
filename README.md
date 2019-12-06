# GoBarber - backend
GoBarber Backend on Node.js - Developed during Rocketseat Bootcamp GoStack

## Starting the Project
### Initial Setup
[I don't like to read, give me the code!](#standalone-project)

To setup this project there are two options. You can setup it as a "DevOps" Project meaning you will use my [DevOps Repository](https://github.com/gusflopes/devops) to setup the basic environment with all the databases needed and then just attach this project to that Environment.

I prefer this approach since I can use the same Database containers for all my development projects. This is also useful to deploy my Portfolio projects, since I run all of them on the same Server using shared resources.

If you don't like this approach, just go to the *Standalone Project* for the instructions.

#### DevOps Dependent
There are two steps on this approach: (1) Build your basic environment and (2) Build the this Application environment

##### Basic Environment (Step 01)
You just need to clone the devops project and run a Docker-compose file:

```
git clone https://github.com/gusflopes/devops.git
cd devops
docker-compose up -d
cd ..
rm -rf devops
```
You should have three containers running (Postgres, MongoDB and Redis), and you can go to step 2.

##### Setup Project (Step 02)
With all the containers running, we can build the Node.js Container.

First you need to setup your environment variables. Just create a `.env` file based on the provided `.env.example`.

If you prefer, you can just go with the default settings and the project should work, but a few functionalities will be disabled (AWS Storage, Mailtrap and Sentry). Just run:

```
cp .env.example .env
docker-compose up
```

*In development I prefer to run it without the dettached mode*.

#### Standalone Project

Just need to run the project? Ok. Type this:
```
cp .env.example .env
docker-compose -f docker-compose.standalone.yml up
```

You should have 4 Containers running: Postgres, MongoDB, Redis an Node.js.
The Node.js container (gobarber) will have 2 instances, the `gobaber-app` and the `Nodemailer queue`.

This is a basic setup. Some functionalities will not be working (like AWS Storage and Nodemailer that need to be configured on the `.env` file).

## Project Details
### Run Commands:
- Start databases: `docker start postgres mongo redis`
- Start gobarber: `docker start -a gobarber`

### Project Content
This project is an Express REST/API using Postgres, MongoDB and Redis.
The main data is stored on Postgres. MongoDB is used for notifications and Redis is used for cache (?) and the Nodemailer job queue.

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



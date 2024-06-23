This is a project was made with learning purposes.

## Description
This is a backend api project for a simple e-commerce application. It pretends to implement frontend with ai generated content to fill the database and make the application more realistic.

## Project features

- Made by Express.js
- Used ORM Sequelize
- Postgres database and migrations
- Dockerized for local databases and development
- Authentication and strategies management with JWT
- Using schemas for validation and middleware for error handling and other purposes
- User roles and permissions
- Sending of emails with nodemailer
- Services:
  - User
  - Product
  - Order
  - Auth
  - Email

## First Setup
* Run `npm install` to install the dependencies
* Run `docker compose up -d` to start the postgres database
* Run `npm run migrations:run` to migrate the database
* Set the environment variables in the `.env` file
* Run `npm run dev` to start the server

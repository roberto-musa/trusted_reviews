# reviews-backend

> Backend for the accountability focused review system based on blockchain

## About

This project uses [Feathers](http://feathersjs.com). An open source framework for building APIs and real-time applications.

## Environement Vars

This project uses theese vars:
- local: node version
- DB_CLIENT: es. mysql2
- DB_HOST: es. 127.0.0.1
- DB_USER
- DB_PASSWORD
- DB_NAME
- DB_PORT: es. 3306
- NODE_ENV: es. production
- HOSTNAME: es. localhost
- PORT: es. 3030
- UserMail: user Id for authentication
- UserPwd: password for authentication

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/reviews-backend
    npm install
    ```

3. Start your app

    ```
    npm run migrate # Run migrations to set up the database
    npm start
    ```

## Testing

Run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

This app comes with a powerful command line interface for Feathers. Here are a few things it can do:

```
$ npx feathers help                           # Show all commands
$ npx feathers generate service               # Generate a new Service
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

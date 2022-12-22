## Description

Star Wars data API written on [Nest](https://github.com/nestjs/nest) and MySQL. Format of data and data itself takes from [SWAPI](swapi.dev) during api initilaization 

## Installation

1. Install all package.json dependencies by:
```bash
$ npm install
```
2. Install [mysql server](https://pen-y-fan.github.io/2021/08/08/How-to-install-MySQL-on-WSL-2-Ubuntu/) and set password for root user.
3. Launch compilation of typesript
```bash
$  npm run build
```
4. Launch migration for creating tables:
```bash
$ npm run migration:run
```
5. Launch seeding db by [swapi.dev](swapi.dev) data
```bash
$ npm run seed:up
```

## Running the app

```bash
# development mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Contacts
My email: maksym.yalovitsa@gmail.com
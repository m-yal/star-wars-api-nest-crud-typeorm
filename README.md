## Description

Star Wars data API written on [Nest](https://github.com/nestjs/nest) and MySQL. Format of data and data itself takes from [SWAPI](swapi.dev) during api initilaization 

## Installation by Docker

1. Install Docker ecosystem on your PC: Docker Desktop (Windows, MacOS), Docker Engine and Docker Compose (Linux)

2. Go to project`s root

3. Copy data form .env.example to .env and change config data according to yours needs
```bash
$ cp .env.example .env
```

4. Execute docker-compose.yml for Docker desktop.
```bash
$ docker-compose up
```
for docker engine:
```bash
$ sudo dockerd
$ docker compose up
```

## Installation without Docker

1. Install all package.json dependencies by:
```bash
$ npm install
```

2. Install [mysql server](https://pen-y-fan.github.io/2021/08/08/How-to-install-MySQL-on-WSL-2-Ubuntu/) and set password for root user.

3. Copy data form .env.example to .env and change config data according to yours needs
```bash
$ cp .env.example .env
```

4. Launch compilation of typesript
```bash
$  npm run build
```

5. Launch migration for creating tables:
```bash
$ npm run migration:run; npm run migration:run:test
```

6. Launch seeding db by [swapi.dev](swapi.dev) data
```bash
$ npm run seed:up; npm run seed:up:test
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
```


## Contacts
My email: maksym.yalovitsa@gmail.com

### Description

Star Wars data CRUD API. Data format and data itself taken from [swapi.dev](https://swapi.dev/) during api seeding.

## Technologies used in project

- [Nest](https://github.com/nestjs/nest)
- [typescript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/)
- [typeorm](https://typeorm.io/)
- [aws-sdk](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html)
- [class-validator](https://www.npmjs.com/package/@nestjs/class-validator)
- [class-transformer](https://github.com/typestack/class-transformer)
- [express-session](https://www.npmjs.com/package/express-session)
- [passport](https://www.npmjs.com/package/passport)
- [passport-local](https://www.npmjs.com/package/passport-local)
- [rxjs](https://www.npmjs.com/package/rxjs)
- [jest](https://www.npmjs.com/package/jest)
- [supertest](https://www.npmjs.com/package/supertest)

## Installation with Docker: recommended

1. Install Docker ecosystem on your PC: Docker Desktop (Windows, MacOS), Docker Engine and Docker Compose (Linux). Commands below are for Linux/WSL2

1.a And launch docker daemon on Linux if absent
```bash
$ sudo dockerd
```

2. Go to project`s root and clone this repo:
```bash
$ git clone https://github.com/m-yal/nest-crud
```

3. Copy data form .env.example to .env and change config data according to yours needs
```bash
$ cp .env.example .env
```

4. Execute docker-compose.yml.
```bash
$ docker compose up
```
or for older versions:
```bash
$ docker-compose up
```

5. Wait untill project`s set up and launch.

## Installation without Docker

1. Install all package-lock.json dependencies by:
```bash
$ npm ci
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

6. Launch seeding db by [swapi.dev](https://swapi.dev/) data
```bash
$ npm run seed:up; npm run seed:up:test
```

## Running the app without docker

```bash
# development mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test
In [package.json](./package.json) change "testRegex" (in "jest" field which describes tests path) for choosing test file to launch
```bash
# unit tests
$ npm run test
```


## Contacts
My email: maksym.yalovitsa@gmail.com

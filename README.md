### Description

Star Wars data CRUD API. Data format and data itself taken from [swapi.dev](https://swapi.dev/) during api seeding.

## Technologies used in project

The main technologies list:
- [Nest](https://github.com/nestjs/nest)
- [typescript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/)
- [typeorm](https://typeorm.io/)
- [aws-sdk](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html)
- [docker](https://docs.docker.com/)
- [nginx](https://hub.docker.com/_/nginx)
- [certbot](https://hub.docker.com/r/certbot/certbot/dockerfile)

Additional technologies list:
- [class-validator](https://www.npmjs.com/package/@nestjs/class-validator)
- [class-transformer](https://github.com/typestack/class-transformer)
- [express-session](https://www.npmjs.com/package/express-session)
- [passport](https://www.npmjs.com/package/passport)
- [passport-local](https://www.npmjs.com/package/passport-local)
- [rxjs](https://www.npmjs.com/package/rxjs)
- [jest](https://www.npmjs.com/package/jest)
- [supertest](https://www.npmjs.com/package/supertest)

## Installation with Docker Compose

1. Install Docker ecosystem on your PC: Docker Desktop (Windows, MacOS), Docker Engine and Docker Compose (Linux). Commands below are for Linux/WSL2

2. Go to project`s root and clone this repo:
```bash
$ git clone https://github.com/m-yal/nest-crud
```

3. Copy data form .env.example to .env and change config data according to yours needs.
```bash
$ cp .env.example .env
```

4. Launch initial script. It sets up a https certificate, change ownership to current user, makes necessary dirs, set up cron task for https certificate renewing and launch prod. instance of the app.
```bash
$ bash install.sh
```
For further launches of prod. version :
```bash
$ bash common-launch.sh
```

5. Wait untill project`s launch.



## Contacts
My email: maksym.yalovitsa@gmail.com
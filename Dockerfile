FROM node:18.12.1

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3005
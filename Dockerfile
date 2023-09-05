FROM node:16.17.1 as base
EXPOSE $PORT

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN rm -rf dist && rm -rf Dockerfile && rm -rf node_modules
RUN touch .env.dev .env.stage .env.prod

RUN echo "APP_ENV=dev \
APP_URL=http://localhost \
APP_PORT=$PORT" > .env

RUN yarn install
RUN yarn add @nestjs/cli

COPY . .

RUN yarn build


ENTRYPOINT yarn start:$ENV_MODE
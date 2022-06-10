FROM node:current-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i --silent && npm i mongoose && npm i bcrypt && npm i node-cache

COPY . .

ENTRYPOINT [ "node", "--experimental-loader=./util/loader.js", "."]
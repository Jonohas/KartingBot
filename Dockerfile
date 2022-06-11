FROM node:current-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i --silent && npm i mongoose && npm i bcrypt && npm i node-cache

COPY . .
RUN ["npm", "run", "command"]
ENTRYPOINT [ "npm", "start"]
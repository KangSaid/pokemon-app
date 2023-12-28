FROM node:18-alpine

RUN mkdir /app && chown node:node /app

WORKDIR /app

USER node

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 80

CMD [ "npm", "start" ]
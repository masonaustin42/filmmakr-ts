FROM node:21-alpine

WORKDIR /app

COPY . .

RUN yarn install
EXPOSE 5000
CMD ["node", "server.mjs"]
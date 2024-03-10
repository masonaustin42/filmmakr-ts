FROM node:21-alpine as BUILD_IMG

WORKDIR /app

COPY . .

RUN yarn
RUN yarn run build

FROM nginx:1.24.0-alpine as PROD_IMG
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=BUILD_IMG /app/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
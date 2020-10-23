FROM node:alpine3.12 as builder
WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install --registry=https://registry.npm.taobao.org

COPY . .
RUN npm run build:prod

FROM nginx:alpine

COPY --from=builder /usr/src/app/dist/blog-front /usr/share/nginx/html
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

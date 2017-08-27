FROM node:alpine as builder

COPY . /tmp/cloudstackui

WORKDIR /tmp/cloudstackui

RUN yarn install --verbose \
    && yarn run build:aot \
    && yarn cache clean \
    && mkdir -p /static && cp -R dist/. /static/ \
    && chmod 755 /static \
    && rm -rf /tmp/cloudstackui

FROM nginx:stable-alpine

COPY .build/nginx.conf /etc/nginx/conf.d/default.conf
COPY .build/startup.sh /etc/nginx/startup.sh

RUN  chmod 777 /etc/nginx/startup.sh

VOLUME /config/

RUN apk update \
    && apk add --update curl \
    && rm -rf /var/cache/apk/*

CMD ["/bin/sh", "-e", "/etc/nginx/startup.sh"]

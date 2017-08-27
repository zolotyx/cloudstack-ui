FROM bwsw/alpine-nginx-node
VOLUME /config/

COPY .build/nginx.conf /etc/nginx/conf.d/default.conf
COPY .build/startup.sh /etc/nginx/startup.sh
COPY . /tmp/cloudstackui

RUN apk update \
    && apk add --update curl \
    && rm -rf /var/cache/apk/*

RUN cd /tmp/cloudstackui \
    && chmod -R 777 /tmp/cloudstackui \
    && yarn install --verbose \
    && yarn run build:aot \
    && yarn cache clean \
    && mkdir -p /static && cp -R dist/. /static/ \
    && chmod 777 /etc/nginx/startup.sh && chmod 755 /static \
    && rm -rf /tmp/cloudstackui

CMD ["/bin/sh", "-e", "/etc/nginx/startup.sh"]

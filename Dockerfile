FROM bwsw/alpine-nginx-node
VOLUME /config/

COPY .build/nginx.conf /etc/nginx/conf.d/default.conf
COPY .build/startup.sh /etc/nginx/startup.sh
COPY . /build
RUN apk update && \
    apk add --update curl && \
    cd /build && \
    yarn && yarn run build:aot && yarn cache clean && \
    mkdir -p /static && cp -R dist/. /static/ && \
    chmod 777 /etc/nginx/startup.sh && chmod 755 /static \
    && rm -rf /build

CMD ["/bin/sh", "-e", "/etc/nginx/startup.sh"]

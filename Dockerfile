FROM bwsw/alpine-nginx-node
VOLUME /config/
RUN mkdir -p /tmp/cloudstackui
COPY .build/nginx.conf /etc/nginx/conf.d/default.conf
COPY .build/startup.sh /etc/nginx/startup.sh
COPY . /tmp/cloudstackui
RUN apk update && \
    apk add --update curl && \
    cd /tmp/cloudstackui && \
    npm i && npm run build:aot && npm cache clean && \
    mkdir -p /static && cp -R dist/. /static/ && \
    chmod 777 /etc/nginx/startup.sh && chmod 755 /static \
    && rm -rf /tmp/cloudstackui

CMD ["/bin/sh", "-e", "/etc/nginx/startup.sh"]

FROM node:alpine as app

WORKDIR /app

RUN apk add --virtual build-dependencies git && \
    git clone https://github.com/avkrasnov/yandex-metrics.git && \
    cd yandex-metrics && \
    npm i && \
    npm run build && \
    apk del build-dependencies

FROM nginx

COPY --from=app /app/yandex-metrics/build /usr/share/nginx/html

EXPOSE 8080
# Отчёты Яндекс.Метрики

1. Скачать [Dockerfile](https://github.com/avkrasnov/yandex-metrics/blob/master/Dockerfile)
2. Собрать образ: `docker build --tag 'yandex_metrics' /path/to/Dockerfile`. Имя образа можно задать любое. В примере это `yandex_metrics`
3. Запустить контейнер: `docker run -p 80:80 -d yandex_metrics`
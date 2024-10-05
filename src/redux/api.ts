import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type YandexRequestData = {
    dateFrom: Date;
    dateTo: Date;
    yandexCounterId: string;
    withoutRobots: boolean;
};

export type Metric = {
    dimensions: [
        {
            icon_id: string,
            icon_type: string,
            id: string,
            name: string,
        }, {
            favicon: string,
            name: string,
        }
    ],
    metrics: [number, number],
};

type YandexMetrics = {
    data: Metric[]
};

export const api = createApi({
    reducerPath: 'yandexApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api-metrika.yandex.net/stat/v1' }),
    endpoints: (builder) => ({
        getMetrics: builder.query<YandexMetrics, YandexRequestData>({
            query: ({ dateFrom, dateTo, yandexCounterId, withoutRobots }) => `/data?metrics=ym:s:visits,ym:s:users&dimensions=ym:s:TrafficSource,ym:s:startURL&filters=ym:s:trafficSource=='organic'${withoutRobots ? `AND ym:s:isRobot=='No'` : ''}&id=${yandexCounterId}&limit=100000&lang=ru&date1=${dateFrom.toISOString().split('T')[0]}&date2=${dateTo.toISOString().split('T')[0]}`,
        }),
    }),
});

export const { useLazyGetMetricsQuery } = api;

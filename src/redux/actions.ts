import { Metric } from "./api";

export type Yandex = {
    counterId: string;
};

export enum ActionTypes {
    SET_YANDEX = 'SET_YANDEX',
    SET_METRICS = 'SET_METRICS',
    SET_METRICS_FETCHING = 'SET_METRICS_FETCHING',
}

export interface IActionSetYandex {
    type: ActionTypes.SET_YANDEX;
    yandex: Yandex;
}

export interface IActionSetMetrics {
    type: ActionTypes.SET_METRICS;
    metrics: Metric[];
}

export interface IActionSetMetricsFetching {
    type: ActionTypes.SET_METRICS_FETCHING;
    isFetching: boolean;
}

export type IActionYandex = IActionSetYandex;
export type IActionMetrics = IActionSetMetrics | IActionSetMetricsFetching;
export type IAction = IActionYandex | IActionMetrics;

export function setYandex(yandex: Yandex): IActionSetYandex {
    return { type: ActionTypes.SET_YANDEX, yandex };
}

export function setMetrics(metrics: Metric[]): IActionSetMetrics {
    return { type: ActionTypes.SET_METRICS, metrics };
}

export function setMetricsFetching(isFetching: boolean): IActionSetMetricsFetching {
    return { type: ActionTypes.SET_METRICS_FETCHING, isFetching };
}

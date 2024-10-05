import { combineReducers } from 'redux';
import { useSelector } from 'react-redux';
import { IRootState } from './store';
import { ActionTypes, IActionMetrics, IActionYandex, Yandex } from './actions';
import { Metric } from './api';

function yandex(state: Yandex = {counterId: localStorage.getItem('YaCounterId') || ''}, action: IActionYandex): Yandex {
    switch (action.type) {
        case ActionTypes.SET_YANDEX:
            return action.yandex;
        default:
            return state;
    }
}

type MetricsData = {
    metrics: Metric[],
    isFetching: boolean,
};

function metrics(state: MetricsData = { metrics: [], isFetching: false }, action: IActionMetrics): MetricsData {
    switch (action.type) {
        case ActionTypes.SET_METRICS:
            return { ...state, metrics: action.metrics };
        case ActionTypes.SET_METRICS_FETCHING:
            return { ...state, isFetching: action.isFetching };
        default:
            return state;
    }
}

const yandexApp = combineReducers({
    yandex,
    metrics,
});

export function useYandex() {
    return useSelector((state: IRootState) => state.app.yandex as Yandex);
}

export function useMetrics() {
    return useSelector((state: IRootState) => state.app.metrics as MetricsData);
}

export default yandexApp;
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { api } from './api';
import yandexApp from './reducers';

const reducers = {
    [api.reducerPath]: api.reducer,
    app: yandexApp,
};

const reducer = combineReducers(reducers);

export type IRootState = ReturnType<typeof reducer>;

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        let middlewares = getDefaultMiddleware().concat(api.middleware);

        return middlewares;
    },
});

setupListeners(store.dispatch);

export default store;

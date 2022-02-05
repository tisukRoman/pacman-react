import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

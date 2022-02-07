import { createStore, combineReducers } from 'redux';
import { game } from './reducers/game';

const rootReducer = combineReducers({ game });

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

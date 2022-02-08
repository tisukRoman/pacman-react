import { createStore, combineReducers } from 'redux';
import { game } from './gameReducer';

export const rootReducer = combineReducers({ game });

export const store = createStore(rootReducer);

store.subscribe(() => console.log(store.getState().game.pacman.coords));

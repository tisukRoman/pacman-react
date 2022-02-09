import { createStore } from 'redux';
import { game } from './gameReducer';

export const store = createStore(game);

store.subscribe(()=> console.log(store.getState().food.count))
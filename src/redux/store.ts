import { createStore } from 'redux';
import { game } from './reducers/game';

export const store = createStore(game);

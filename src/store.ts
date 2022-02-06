import { createStore, combineReducers } from 'redux';
import { pacman } from './reducers/pacman';
import { arena } from './reducers/arena';

const rootReducer = combineReducers({
  pacman,
  arena,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

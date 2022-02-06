import { createStore, combineReducers } from 'redux';
import { pacman } from './reducers/pacman';
import { arena } from './reducers/arena';
import { header } from './reducers/header';

const rootReducer = combineReducers({
  pacman,
  arena,
  header
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

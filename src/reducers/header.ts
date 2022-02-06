import { Action } from 'redux';
import { HeaderState } from '../setup/types';

const headerState: HeaderState = {
  title: 'GAME OVER!',
};

export const header = (state = headerState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

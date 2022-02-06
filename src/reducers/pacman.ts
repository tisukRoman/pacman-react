import { Action } from 'redux';
import { Direction, PacmanState } from '../setup/types';

const pacmanState: PacmanState = {
  coords: {
    x: 0,
    y: 0,
  },
  direction: Direction.RIGHT,
};

export const pacman = (state = pacmanState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

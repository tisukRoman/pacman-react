import { Action } from 'redux';
import { move } from '../setup/constants';
import { Direction, PacmanState } from '../setup/types';

const pacmanState: PacmanState = {
  coords: {
    x: 50,
    y: 50,
  },
  direction: Direction.RIGHT,
};

export const pacman = (state = pacmanState, action: Action) => {
  switch (action.type) {
    case move.RIGHT: {
      return {
        direction: Direction.RIGHT,
        coords: { y: state.coords.y, x: state.coords.x + 2 },
      };
    }
    default:
      return state;
  }
};

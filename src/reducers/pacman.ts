import { Action } from 'redux';
import c from '../setup/constants';
import { Direction, PacmanState } from '../setup/types';

const pacmanState: PacmanState = {
  coords: {
    x: 50,
    y: 50,
  },
  direction: Direction.RIGHT,
};

interface AC extends Action {
  direction: Direction;
}

export const pacman = (state = pacmanState, action: AC) => {
  switch (action.type) {
    case c.CHANGE_DIRECTION:
      return {
        ...state,
        direction: action.direction,
      };
    default:
      return state;
  }
};

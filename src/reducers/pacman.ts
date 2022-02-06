import { Action } from 'redux';
import { Coords, Direction } from '../setup/types';

const pacmanState: {
  coords: Coords;
  direction: Direction;
} = {
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

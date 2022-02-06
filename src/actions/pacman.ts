import { Action } from 'redux';
import { move } from '../setup/constants';
import { Direction } from '../setup/types';

export const movePacman = (direction: Direction): Action | void => {
  switch (direction) {
    case move.RIGHT:
      return { type: move.RIGHT };
    default:
      return;
  }
};

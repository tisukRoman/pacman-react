import { Action } from 'redux';
import { Direction } from '../setup/types';
import c from '../setup/constants';

interface AC extends Action {
  direction: Direction;
}

export const changeDirection = (direction: Direction): AC => ({
  type: c.CHANGE_DIRECTION,
  direction,
});

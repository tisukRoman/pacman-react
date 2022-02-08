import { Action } from 'redux';
import { ActionDir, Direction } from '../setup/types';
import c from '../setup/constants';

export const changeDirection = (direction: Direction): ActionDir => ({
  type: c.CHANGE_PACMAN_DIRECTION,
  direction,
});

export const movePacman = (): Action => ({ type: c.MOVE_PACMAN });

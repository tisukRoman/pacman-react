import { AppAction, Direction, PacmanState } from '../../setup/types';
import { gameState } from '../gameState';
import { constants as c } from '../../setup/constants';

// prettier-ignore
export function pacman (state = gameState.pacman, action: AppAction ): PacmanState {
    switch (action.type) {
      case c.CANCELL_POWER_MODE:
        return {
          ...state,
          power: false,
        };
      case c.PACMAN_EAT_POWER_FOOD:
        return {
          ...state,
          power: true,
        };
      case c.CHANGE_PACMAN_DIRECTION:
        return {
          ...state,
          direction: action.direction ? action.direction : Direction.RIGHT,
        };
      case c.CHANGE_PACMAN_COORDINATES:
        return {
          ...state,
          coords: action.coords ? action.coords : [14, 10],
        };
      default:
        return state;
    }
  }

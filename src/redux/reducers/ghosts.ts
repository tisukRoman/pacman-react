import { AppAction, GhostState } from '../../setup/types';
import { gameState } from '../gameState';
import { constants as c } from '../../setup/constants';

export function ghosts(state = gameState.ghosts, action: AppAction) {
  switch (action.type) {
    case c.SPAWN_EATEN_GHOST:
      return [
        ...state,
        ...gameState.ghosts.filter((ghost) => ghost.id === action.id),
      ];
    case c.EAT_SCARED_GHOST:
      return state.filter((ghost: GhostState) => ghost.id !== action.id);
    case c.CANCELL_POWER_MODE:
      return state.map((ghost: GhostState) => ({
        ...ghost,
        isScared: false,
      }));
    case c.PACMAN_EAT_POWER_FOOD:
      return state.map((ghost: GhostState) => ({
        ...ghost,
        isScared: true,
      }));
    case c.CHANGE_GHOST_DIRECTION:
      return state.map((ghost: GhostState) => {
        if (ghost.id === action.id) {
          return {
            ...ghost,
            direction: action.direction,
          };
        } else {
          return ghost;
        }
      });
    case c.CHANGE_GHOST_COORDINATES:
      return state.map((ghost: GhostState) => {
        if (ghost.id === action.id) {
          return {
            ...ghost,
            coords: action.coords,
          };
        } else {
          return ghost;
        }
      });
    default:
      return state;
  }
}

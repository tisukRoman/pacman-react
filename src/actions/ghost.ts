import { AppAction, Coords, Direction } from '../setup/types';
import { constants as c } from '../setup/constants';

export const changeGhostDirection = (
  id: number,
  direction: Direction
): AppAction => ({
  type: c.CHANGE_GHOST_DIRECTION,
  direction,
  id,
});

export const changeGhostCoords = (id: number, coords: Coords): AppAction => ({
  type: c.CHANGE_GHOST_COORDINATES,
  coords,
  id,
});

export const ghostEatsFood = (coords: Coords): AppAction => ({
  type: c.GHOST_EAT_FOOD,
  coords,
});

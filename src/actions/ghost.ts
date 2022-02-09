import { AppAction, Coords, Direction } from '../setup/types';
import {constants as c} from '../setup/constants';

export const changeGhostDirection = (id: number, direction: Direction): AppAction => ({
  type: c.CHANGE_PACMAN_DIRECTION,
  direction,
  id,
});

export const changeGhostCoords = (id: number, coords: Coords): AppAction => ({
  type: c.CHANGE_PACMAN_COORDINATES,
  coords,
  id
});
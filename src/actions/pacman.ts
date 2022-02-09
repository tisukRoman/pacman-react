import { AppAction, Coords, Direction } from '../setup/types';
import {constants as c} from '../setup/constants';

export const changePacmanDirection = (direction: Direction): AppAction => ({
  type: c.CHANGE_PACMAN_DIRECTION,
  direction,
});

export const changePacmanCoords = (coords: Coords): AppAction => ({
  type: c.CHANGE_PACMAN_COORDINATES,
  coords,
});

export const cancellPowerMode = (): AppAction => ({
  type: c.CANCELL_POWER_MODE,
});

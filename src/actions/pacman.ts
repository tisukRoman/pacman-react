import { A, Coords, Direction } from '../setup/types';
import c from '../setup/constants';

export const changePacmanDirection = (direction: Direction): A => ({
  type: c.CHANGE_PACMAN_DIRECTION,
  direction,
});

export const changePacmanCoords = (coords: Coords): A => ({
  type: c.CHANGE_PACMAN_COORDINATES,
  coords,
});
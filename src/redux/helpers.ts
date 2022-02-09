import { updateArena } from '../actions/arena';
import { eatPowerFood, eatUsualFood } from '../actions/food';
import { changePacmanCoords } from '../actions/pacman';
import { ArenaState, Coords, Direction, PacmanState } from '../setup/types';
import { store } from './store';
import { objects as o } from '../setup/constants';
import { gameOver } from '../actions/game';

export function pacmanMoves(arena: ArenaState, pacman: PacmanState) {
  getFoodSpawnCoords(arena);
  const [i, j] = findPacmanCoords(arena);

  switch (pacman.direction) {
    case Direction.RIGHT:
      moveIn(arena, [i, j + 1]);
      break;
    case Direction.LEFT:
      moveIn(arena, [i, j - 1]);
      break;
    case Direction.UP:
      moveIn(arena, [i - 1, j]);
      break;
    case Direction.DOWN:
      moveIn(arena, [i + 1, j]);
      break;
  }
  store.dispatch(updateArena());
}

function moveIn(arena: ArenaState, coords: Coords) {
  const [i, j] = coords;

  if (isGhost(arena[i][j])) {
    store.dispatch(changePacmanCoords([i, j]));
    store.dispatch(gameOver());
  } else if (isFood(arena[i][j])) {
    store.dispatch(changePacmanCoords([i, j]));
    store.dispatch(eatUsualFood([i, j]));
  } else if (isPowerFood(arena[i][j])) {
    store.dispatch(changePacmanCoords([i, j]));
    store.dispatch(eatPowerFood([i, j]));
  } else if (isWall(arena[i][j])) {
    return;
  } else if (isFloor(arena[i][j])) {
    store.dispatch(changePacmanCoords([i, j]));
  }
}

export function findPacmanCoords(arena: ArenaState): Coords {
  for (let i = 0; i < arena.length; i++) {
    for (let j = 0; j < arena[i].length; j++) {
      if (arena[i][j] === o.PACMAN) return [i, j];
      else continue;
    }
  }
  return [-1, -1]; // never returns
}

function isWall(element: number): boolean {
  return element === o.WALL;
}

function isFloor(element: number): boolean {
  return element === o.FLOOR;
}

function isFood(element: number): boolean {
  return element === o.FOOD;
}

function isPowerFood(element: number): boolean {
  return element === o.POWER_FOOD;
}

function isGhost(element: number): boolean {
  return element === o.GHOST;
}

export function getFoodSpawnCoords(arena: ArenaState): Coords[] {
  const coords: Coords[] = [];
  for (let i = 0; i < arena.length; i++) {
    for (let j = 0; j < arena[i].length; j++) {
      if (arena[i][j] === o.FOOD) coords.push([i, j]);
      if (arena[i][j] === o.POWER_FOOD) coords.push([i, j]);
    }
  }
  return coords;
}

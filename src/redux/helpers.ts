import { updateArena } from '../actions/arena';
import { changePacmanCoords } from '../actions/pacman';
import { ArenaState, Coords, Direction, PacmanState } from '../setup/types';
import { store } from './store';

const PACMAN = 3;
const WALL = 1;
const FOOD = 2;
const POWER_FOOD = 7;
const FLOOR = 0;
const GHOST = 9;

export function pacmanMoves(arena: ArenaState, pacman: PacmanState) {
  const [i, j] = findPacmanCoords(arena);

  switch (pacman.direction) {
    case Direction.RIGHT:
      store.dispatch(changePacmanCoords([i, j + 1]));
      break;
    case Direction.LEFT:
      store.dispatch(changePacmanCoords([i, j - 1]));
      break;
    case Direction.UP:
      store.dispatch(changePacmanCoords([i - 1, j]));
      break;
    case Direction.DOWN:
      store.dispatch(changePacmanCoords([i + 1, j]));
      break;
  }

  store.dispatch(updateArena())
}

export function findPacmanCoords(arena: ArenaState): Coords {
  debugger;
  for (let i = 0; i < arena.length; i++) {
    for (let j = 0; j < arena[i].length; j++) {
      if (arena[i][j] === PACMAN) {
        return [i, j];
      } else {
        continue;
      }
    }
  }
  return [-1, -1]; // never returns
}


function isWall(element: number): boolean {
  return element === WALL;
}

function isFloor(element: number): boolean {
  return element === FLOOR;
}

function isFood(element: number): boolean {
  return element === FOOD;
}

function isPowerFood(element: number): boolean {
  return element === POWER_FOOD;
}

function isGhost(element: number): boolean {
  return element === GHOST;
}

export function getFoodSpawnCoords(arena: ArenaState): Coords[] {
  const coords: Coords[] = [];
  for (let i = 0; i < arena.length; i++) {
    for (let j = 0; j < arena[i].length; j++) {
      if (arena[i][j] === FOOD) coords.push([i, j]);
    }
  }
  return coords;
}

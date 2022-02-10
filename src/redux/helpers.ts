import { eatPowerFood, eatUsualFood } from '../actions/food';
import { changePacmanCoords, eatScaredGhost } from '../actions/pacman';
import {
  ArenaState,
  Coords,
  Direction,
  GhostState,
  PacmanState,
} from '../setup/types';
import { store } from './store';
import { objects as o } from '../setup/constants';
import { gameOver } from '../actions/game';
import {
  changeGhostCoords,
  changeGhostDirection,
  ghostEatsFood
} from '../actions/ghost';

export function pacmanMoves(arena: ArenaState, pacman: PacmanState) {
  const coords = findPacmanCoords(arena);
  if (!coords) {
    return;
  }
  const [i, j] = coords;

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
}

function moveIn(arena: ArenaState, coords: Coords) {
  const [i, j] = coords;

  if (isWall(arena[i][j])) {
    return;
  } else if (isGhost(arena[i][j])) {
    if (store.getState().pacman.power) {
      store.dispatch(eatScaredGhost(arena[i][j]));
    } else {
      store.dispatch(gameOver());
    }
  } else if (isFood(arena[i][j])) {
    store.dispatch(changePacmanCoords([i, j]));
    store.dispatch(eatUsualFood([i, j]));
  } else if (isPowerFood(arena[i][j])) {
    store.dispatch(changePacmanCoords([i, j]));
    store.dispatch(eatPowerFood([i, j]));
  } else {
    store.dispatch(changePacmanCoords([i, j]));
  }
}

export function findPacmanCoords(arena: ArenaState): Coords | undefined {
  for (let i = 0; i < arena.length; i++) {
    for (let j = 0; j < arena[i].length; j++) {
      if (arena[i][j] === o.PACMAN) return [i, j];
      else continue;
    }
  }
  return undefined;
}

export function findGhostCoords(
  arena: ArenaState,
  id: number
): Coords | undefined {
  for (let i = 0; i < arena.length; i++) {
    for (let j = 0; j < arena[i].length; j++) {
      if (arena[i][j] === id) return [i, j];
      else continue;
    }
  }
  return undefined;
}

function isPacman(element: number): boolean {
  return element === o.PACMAN;
}

function isFloor(element: number): boolean {
  return element === o.FLOOR;
}

function isWall(element: number): boolean {
  return element === o.WALL;
}

function isFood(element: number): boolean {
  return element === o.FOOD;
}

function isPowerFood(element: number): boolean {
  return element === o.POWER_FOOD;
}

function isGhost(element: number): boolean {
  return o.GHOST.includes(element);
}

export function ghostMoves(arena: ArenaState, ghost: GhostState) {
  const coords = findGhostCoords(arena, ghost.id);
  if (!coords) {
    return;
  }
  const [i, j] = coords;

  switch (ghost.direction) {
    case Direction.RIGHT:
      moveGhostIn(arena, [i, j + 1], ghost.id);
      break;
    case Direction.LEFT:
      moveGhostIn(arena, [i, j - 1], ghost.id);
      break;
    case Direction.UP:
      moveGhostIn(arena, [i - 1, j], ghost.id);
      break;
    case Direction.DOWN:
      moveGhostIn(arena, [i + 1, j], ghost.id);
      break;
  }
}

function moveGhostIn(arena: ArenaState, coords: Coords, id: number) {
  const [i, j] = coords;

  if (isPacman(arena[i][j])) {
    if (!store.getState().pacman.power) {
      store.dispatch(gameOver());
    }
  } else if (isFood(arena[i][j]) || isPowerFood(arena[i][j])) {
    store.dispatch(ghostEatsFood([i, j]));
    store.dispatch(changeGhostCoords(id, [i, j]));
  } else if (isWall(arena[i][j]) || isGhost(arena[i][j])) {
    const randomDirection = [
      Direction.LEFT,
      Direction.RIGHT,
      Direction.UP,
      Direction.DOWN,
    ][Math.floor(Math.random() * 4)];
    store.dispatch(changeGhostDirection(id, randomDirection));
  } else if (isFloor(arena[i][j])) {
    store.dispatch(changeGhostCoords(id, [i, j]));
  } else {
    return;
  }
}

import { ArenaState, Coords, Direction, GhostState, PacmanState } from '../setup/types';
import { objects as o } from '../setup/constants';
import { store } from '../redux/store';
import { gameOver } from '../actions/game';
import { eatPowerFood, eatUsualFood } from '../actions/food';
import { changePacmanCoords, eatScaredGhost } from '../actions/pacman';
import { changeGhostCoords, changeGhostDirection, ghostEatsFood, spawnEatenGhost } from '../actions/ghost';
import { updateArena } from '../actions/arena';


// Main function of the Game

export function gameLoop(arena: ArenaState, pacman: PacmanState, ghosts: GhostState[]){
  pacmanMoves(arena, pacman);
  ghosts.forEach((ghost) => ghostMoves(arena, ghost));
  store.dispatch(updateArena());
}

// Pacman functions

function pacmanMoves(arena: ArenaState, pacman: PacmanState) {
  const coords = findPacmanCoords(arena);
  if (!coords) {
    return;
  }
  const [i, j] = coords;

  checkIfGhostsNear(arena, pacman, [i, j + 1]);
  checkIfGhostsNear(arena, pacman, [i, j - 1]);
  checkIfGhostsNear(arena, pacman, [i + 1, j]);
  checkIfGhostsNear(arena, pacman, [i - 1, j]);

  switch (pacman.direction) {
    case Direction.RIGHT:
      movePacmanIn(arena, [i, j + 1]);
      break;
    case Direction.LEFT:
      movePacmanIn(arena, [i, j - 1]);
      break;
    case Direction.UP:
      movePacmanIn(arena, [i - 1, j]);
      break;
    case Direction.DOWN:
      movePacmanIn(arena, [i + 1, j]);
      break;
  }
}

function findPacmanCoords(arena: ArenaState): Coords | undefined {
  for (let i = 0; i < arena.length; i++) {
    for (let j = 0; j < arena[i].length; j++) {
      if (arena[i][j] === o.PACMAN) return [i, j];
      else continue;
    }
  }
  return undefined;
}

function checkIfGhostsNear(arena: ArenaState, pacman: PacmanState, coords: Coords) {
  const [i, j] = coords;
  if (isGhost(arena[i][j])) {
    if (pacman.power) {
      store.dispatch(eatScaredGhost(arena[i][j]));
      store.dispatch(spawnEatenGhost(arena[i][j]));
    } else {
      store.dispatch(gameOver());
    }
  }
}

function movePacmanIn(arena: ArenaState, [i, j]: Coords) {
  if (isWall(arena[i][j])) {
    return;
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

// Ghosts functions

function ghostMoves(arena: ArenaState, ghost: GhostState) {
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

function findGhostCoords(arena: ArenaState, id: number): Coords | undefined {
  for (let i = 0; i < arena.length; i++) {
    for (let j = 0; j < arena[i].length; j++) {
      if (arena[i][j] === id) return [i, j];
      else continue;
    }
  }
  return undefined;
}

function moveGhostIn(arena: ArenaState, [i, j]: Coords, id: number) {
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

// functions to check the object type on the current cell

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

import {
  ActionDir,
  ArenaState,
  Coords,
  Direction,
  GameState,
} from '../setup/types';
import c from '../setup/constants';

const gameState: GameState = {
  title: 'Welcome',
  arena: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
    [1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 7, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1],
    [0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 0, 0, 0],
    [1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1],
    [1, 0, 0, 0, 2, 2, 2, 1, 9, 9, 9, 9, 1, 2, 2, 2, 0, 0, 0, 1],
    [1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1],
    [0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 1, 2, 0, 0, 0, 3, 0, 0, 2, 1, 2, 1, 0, 0, 0],
    [1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 7, 1],
    [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  pacman: {
    coords: [14, 10],
    direction: Direction.RIGHT,
  },
};

export const game = (state = gameState, action: ActionDir): GameState => {
  switch (action.type) {
    case c.CHANGE_PACMAN_DIRECTION:
      return {
        ...state,
        pacman: pacman(state.pacman, action),
      };
    case c.MOVE_PACMAN:
      return {
        ...state,
        arena: updateArena(state),
        pacman: {
          ...state.pacman,
          coords: findPacmanCoords(state.arena),
        },
      };
    default:
      return state;
  }
};

export const pacman = (state = gameState.pacman, action: ActionDir) => {
  switch (action.type) {
    case c.CHANGE_PACMAN_DIRECTION:
      return {
        ...state,
        direction: action.direction,
      };
    default:
      return state;
  }
};

// Additional functions

function updateArena(state: GameState): ArenaState {
  const arena = state.arena;
  const pacman = state.pacman;

  switch (pacman.direction) {
    case Direction.RIGHT:
      return moveRight(arena);
    case Direction.LEFT:
      return moveLeft(arena);
    case Direction.UP:
      return moveUp(arena);
    case Direction.DOWN:
      return moveDown(arena);
    default:
      return arena;
  }
}

function moveRight(arena: ArenaState) {
  const [i, j] = findPacmanCoords(arena);
  if (isObstacle(arena[i][j + 1])) {
    return arena;
  }
  arena[i][j + 1] = arena[i][j];
  arena[i][j] = 0;
  return arena;
}

function moveLeft(arena: ArenaState) {
  const [i, j] = findPacmanCoords(arena);
  if (isObstacle(arena[i][j - 1])) {
    return arena;
  }
  arena[i][j - 1] = arena[i][j];
  arena[i][j] = 0;
  return arena;
}

function moveUp(arena: ArenaState) {
  const [i, j] = findPacmanCoords(arena);
  if (isObstacle(arena[i - 1][j])) {
    return arena;
  }
  arena[i - 1][j] = arena[i][j];
  arena[i][j] = 0;
  return arena;
}

function moveDown(arena: ArenaState) {
  const [i, j] = findPacmanCoords(arena);
  if (isObstacle(arena[i + 1][j])) {
    return arena;
  }
  arena[i + 1][j] = arena[i][j];
  arena[i][j] = 0;
  return arena;
}

function findPacmanCoords(arena: ArenaState): Coords {
  for (let i = 0; i < 26; i++) {
    for (let j = 0; j < 21; j++) {
      if (arena[i][j] === 3) return [i, j];
    }
  }
  return [-1, -1]; // never
}

function isObstacle(element: number): boolean {
  return element === 1;
}

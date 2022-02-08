import { ArenaState, Coords, Direction, GameState } from '../setup/types';

export function updateArena(state: GameState): ArenaState {
  const arena = state.arena;
  const pacman = state.pacman;
  const [i, j] = findPacmanCoords(arena);

  switch (pacman.direction) {
    case Direction.RIGHT:
      return moveFromTo(arena, [i, j], [i, j + 1]);
    case Direction.LEFT:
      return moveFromTo(arena, [i, j], [i, j - 1]);
    case Direction.UP:
      return moveFromTo(arena, [i, j], [i - 1, j]);
    case Direction.DOWN:
      return moveFromTo(arena, [i, j], [i + 1, j]);
    default:
      return arena;
  }
}

export function findPacmanCoords(arena: ArenaState): Coords {
  for (let i = 0; i < arena.length; i++) {
    for (let j = 0; j < arena[i].length; j++) {
      if (arena[i][j] === 3) return [i, j];
    }
  }
  return [-1, -1]; // never returns
}

function moveFromTo(arena: ArenaState, current: Coords, next: Coords) {
  const [i, j] = current;
  const [x, y] = next;

  if (isObstacle(arena[x][y])) {
    return arena;
  }
  arena[x][y] = arena[i][j];
  arena[i][j] = 0;
  return arena;
}

function isObstacle(element: number): boolean {
  return element === 1;
}

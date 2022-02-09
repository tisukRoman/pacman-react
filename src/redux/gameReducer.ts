import { AppAction, ArenaState, Direction, GameState } from '../setup/types';
import c from '../setup/constants';

const gameState: GameState = {
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
    [0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 0],
    [1, 1, 1, 1, 2, 1, 2, 1, 0, 9, 9, 0, 1, 2, 1, 2, 1, 1, 1, 1],
    [1, 0, 0, 0, 2, 2, 2, 1, 0, 9, 9, 0, 1, 2, 2, 2, 0, 0, 0, 1],
    [1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1],
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
  food: {
    count: 172,
    coordsList: [],
  },
  title: 'Welcome',
  currentScore: 0,
  maxScore: 0,
};

export const game = (state = gameState, action: AppAction): GameState => {
  switch (action.type) {
    case c.EAT_USUAL_FOOD:
      return {
        ...JSON.parse(JSON.stringify(state)),
        currentScore: state.currentScore + 100,
        food: food(state.food, action),
      };
    case c.UPDATE_ARENA:
      return {
        ...JSON.parse(JSON.stringify(state)),
        arena: getUpdatedArena(state),
      };
    case c.CHANGE_PACMAN_DIRECTION:
      return {
        ...JSON.parse(JSON.stringify(state)),
        pacman: pacman(state.pacman, action),
      };
    case c.CHANGE_PACMAN_COORDINATES:
      return {
        ...JSON.parse(JSON.stringify(state)),
        pacman: pacman(state.pacman, action),
      };
    default:
      return state;
  }
};

export const pacman = (state = gameState.pacman, action: AppAction) => {
  switch (action.type) {
    case c.CHANGE_PACMAN_DIRECTION:
      return {
        direction: action.direction,
        coords: state.coords,
      };
    case c.CHANGE_PACMAN_COORDINATES:
      return {
        direction: state.direction,
        coords: action.coords,
      };
    default:
      return state;
  }
};

export const food = (state = gameState.food, action: AppAction) => {
  switch (action.type) {
    case c.EAT_USUAL_FOOD:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

// utils
function getUpdatedArena(state: GameState): ArenaState {
  let arena = state.arena.map((row) => {
    return row.map((el) => {
      if (el === 3) return 0;
      else return el;
    });
  });

  const [i, j] = state.pacman.coords;
  arena[i][j] = 3;

  return arena;
}

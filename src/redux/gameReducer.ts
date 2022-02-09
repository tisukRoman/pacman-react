import {
  AppAction,
  ArenaState,
  Direction,
  FoodState,
  GameState,
  PacmanState,
} from '../setup/types';
import { constants as c } from '../setup/constants';
import { objects as o } from '../setup/constants';

const gameState: GameState = {
  isLose: false,
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
    power: false,
    coords: [14, 10],
    direction: Direction.RIGHT,
  },
  food: {
    count: 176,
    coordsList: [],
  },
  currentScore: 0,
  maxScore: 0,
};

export const game = (state = gameState, action: AppAction): GameState => {
  switch (action.type) {
    case c.RESTART_GAME:
      return gameState;
    case c.GAME_OVER:
      return {
        ...JSON.parse(JSON.stringify(state)),
        isLose: true,
      };
    case c.CANCELL_POWER_MODE:
      return {
        ...JSON.parse(JSON.stringify(state)),
        pacman: pacman(state.pacman, action),
      };
    case c.EAT_POWER_FOOD:
      return {
        ...JSON.parse(JSON.stringify(state)),
        currentScore: state.currentScore + 50,
        food: food(state.food, action),
        pacman: pacman(state.pacman, action),
      };
    case c.EAT_USUAL_FOOD:
      return {
        ...JSON.parse(JSON.stringify(state)),
        currentScore: state.currentScore + 10,
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

// prettier-ignore
export const pacman = (state = gameState.pacman, action: AppAction ): PacmanState => {
  switch (action.type) {
    case c.CANCELL_POWER_MODE:
      return {
        ...state,
        power: false,
      };
    case c.EAT_POWER_FOOD:
      return {
        ...state,
        power: true,
      };
    case c.CHANGE_PACMAN_DIRECTION:
      return {
        ...state,
        direction: action.direction ? action.direction : Direction.RIGHT,
      };
    case c.CHANGE_PACMAN_COORDINATES:
      return {
        ...state,
        coords: action.coords ? action.coords : [14, 10],
      };
    default:
      return state;
  }
};

export const food = (state = gameState.food, action: AppAction): FoodState => {
  switch (action.type) {
    case c.EAT_POWER_FOOD:
      return {
        ...state,
        count: state.count - 1,
      };
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
      if (el === o.PACMAN) return o.FLOOR;
      else return el;
    });
  });

  const [i, j] = state.pacman.coords;
  arena[i][j] = o.PACMAN;

  return arena;
}

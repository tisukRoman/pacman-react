import { AppAction, ArenaState, GameState } from '../../setup/types';
import { gameState } from '../gameState';
import { constants as c } from '../../setup/constants';
import { objects as o } from '../../setup/constants';
import { ghosts } from './ghosts';
import { pacman } from './pacman';

export const game = (state = gameState, action: AppAction): GameState => {
  switch (action.type) {
    case c.SPAWN_FOOD:
      return {
        ...JSON.parse(JSON.stringify(state)),
        arena: spawnFood(state),
      };
    case c.SPAWN_EATEN_GHOST:
      return {
        ...JSON.parse(JSON.stringify(state)),
        arena: spawnGhost(state.arena, action),
        ghosts: ghosts(state.ghosts, action),
      };
    case c.GHOST_EAT_FOOD:
      return {
        ...JSON.parse(JSON.stringify(state)),
      };
    case c.EAT_SCARED_GHOST:
      return {
        ...JSON.parse(JSON.stringify(state)),
        currentScore: state.currentScore + 100,
        ghosts: ghosts(state.ghosts, action),
      };
    case c.CHANGE_GHOST_COORDINATES:
      return {
        ...JSON.parse(JSON.stringify(state)),
        ghosts: ghosts(state.ghosts, action),
      };
    case c.CHANGE_GHOST_DIRECTION:
      return {
        ...JSON.parse(JSON.stringify(state)),
        ghosts: ghosts(state.ghosts, action),
      };
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
        ghosts: ghosts(state.ghosts, action),
      };
    case c.PACMAN_EAT_POWER_FOOD:
      return {
        ...JSON.parse(JSON.stringify(state)),
        currentScore: state.currentScore + 50,
        pacman: pacman(state.pacman, action),
        ghosts: ghosts(state.ghosts, action),
      };
    case c.PACMAN_EAT_USUAL_FOOD:
      return {
        ...JSON.parse(JSON.stringify(state)),
        currentScore: state.currentScore + 10,
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

// utils
function getUpdatedArena(state: GameState): ArenaState {
  let arena = state.arena.map((row) => {
    return row.map((el) => {
      if (el === o.PACMAN) return o.FLOOR;
      if (o.GHOST.includes(el)) return o.FLOOR;
      else return el;
    });
  });

  const [i, j] = state.pacman.coords;
  arena[i][j] = o.PACMAN;

  state.ghosts.forEach((ghost) => {
    const [i, j] = ghost.coords;
    arena[i][j] = ghost.id;
  });

  return arena;
}

function spawnGhost(arena: ArenaState, action: AppAction) {
  const newArena = arena;
  switch (action.id) {
    case 11:
      newArena[10][9] = 11;
      break;
    case 12:
      newArena[11][9] = 12;
      break;
    case 13:
      newArena[10][10] = 13;
      break;
    case 14:
      newArena[11][10] = 14;
      break;
    default:
      return newArena;
  }
  return newArena;
}

function spawnFood(state: GameState) {
  const newArena = state.arena;
  const initialArena = gameState.arena;

  for (let i = 0; i < initialArena.length; i++) {
    for (let j = 0; j < initialArena[i].length; j++) {
      if (initialArena[i][j] === o.FOOD) {
        if (newArena[i][j] === o.FLOOR) {
          newArena[i][j] = o.FOOD;
        }
      } else if (initialArena[i][j] === o.POWER_FOOD) {
        if (newArena[i][j] === o.FLOOR) {
          newArena[i][j] = o.POWER_FOOD;
        }
      }
    }
  }

  return newArena;
}

import { Action } from 'redux';
import c from '../setup/constants';
import { Direction, PacmanState } from '../setup/types';

const pacmanState: PacmanState = {
  coords: {
    x: 50,
    y: 50,
  },
  direction: Direction.RIGHT,
};

interface AC extends Action {
  direction: Direction;
}

export const pacman = (state = pacmanState, action: AC) => {
  switch (action.type) {
    case c.CHANGE_DIRECTION:
      return {
        ...state,
        direction: action.direction,
      };
    case c.MOVE_PACMAN:
      return moveIn(state, state.direction);
    default:
      return state;
  }
};


// Additional functions
function moveIn(state: PacmanState, dir: Direction, speed = 0.5) {
  switch (dir) {
    case Direction.RIGHT:
      return {
        ...state,
        coords: { x: state.coords.x + speed, y: state.coords.y },
      };
    case Direction.LEFT:
      return {
        ...state,
        coords: { x: state.coords.x - speed, y: state.coords.y },
      };
    case Direction.UP:
      return {
        ...state,
        coords: { x: state.coords.x, y: state.coords.y - speed },
      };
    case Direction.DOWN:
      return {
        ...state,
        coords: { x: state.coords.x, y: state.coords.y + speed },
      };
  }
}

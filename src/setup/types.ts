import { Action } from 'redux';
import { rootReducer } from '../redux/store';

export type AppState = ReturnType<typeof rootReducer>;

export type Coords = [number, number];

export const enum Direction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UP = 'UP',
  DOWN = 'DOWN',
}

export type ArenaState = number[][];

export type PacmanState = {
  direction: Direction;
  coords: Coords;
};

export type GameState = {
  title: string;
  currentScore: number;
  maxScore: number;
  arena: ArenaState;
  pacman: PacmanState;
};

export interface ActionDir extends Action {
  direction: Direction;
}

import { game } from '../redux/gameReducer';

export type AppState = ReturnType<typeof game>;

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
  power: boolean;
};

export type FoodState = {
  count: number;
  coordsList: Coords[];
};

export type GameState = {
  isLose: boolean;
  currentScore: number;
  maxScore: number;
  arena: ArenaState;
  pacman: PacmanState;
  food: FoodState;
};

export type AppAction = {
  type: string;
  direction?: Direction;
  coords?: Coords;
};

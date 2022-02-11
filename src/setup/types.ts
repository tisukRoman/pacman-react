import { game } from '../redux/reducers/game';

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

export type GhostState = {
  id: number;
  coords: Coords;
  direction: Direction;
  isScared: boolean;
};

export type GameState = {
  isLose: boolean;
  currentScore: number;
  maxScore: number;
  arena: ArenaState;
  pacman: PacmanState;
  ghosts: GhostState[];
};

export type AppAction = {
  type: string;
  id?: number;
  direction?: Direction;
  coords?: Coords;
}
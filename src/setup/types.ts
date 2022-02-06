export type Coords = {
  x: number;
  y: number;
};

export const enum Direction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UP = 'UP',
  DOWN = 'DOWN',
}

export type PacmanState = {
  coords: Coords;
  direction: Direction;
};

export type ArenaState = {
  scheme: number[];
};

export type HeaderState = {
  title: string;
};

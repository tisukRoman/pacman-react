import { AppAction, Coords } from '../setup/types';
import { constants as c } from '../setup/constants';

export const eatUsualFood = (coords: Coords): AppAction => ({
  type: c.PACMAN_EAT_USUAL_FOOD,
  coords,
});

export const eatPowerFood = (coords: Coords): AppAction => ({
  type: c.PACMAN_EAT_POWER_FOOD,
  coords,
});

export const spawnFood = (): AppAction => ({
  type: c.SPAWN_FOOD,
});

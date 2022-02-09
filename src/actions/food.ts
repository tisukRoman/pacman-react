import { AppAction, Coords } from '../setup/types';
import {constants as c} from '../setup/constants';

export const eatUsualFood = (coords: Coords): AppAction => ({
  type: c.EAT_USUAL_FOOD,
  coords,
});

export const eatPowerFood = (coords: Coords): AppAction => ({
  type: c.EAT_POWER_FOOD,
  coords,
});
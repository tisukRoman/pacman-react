import { AppAction, Coords } from '../setup/types';
import c from '../setup/constants';

export const eatUsualFood = (coords: Coords): AppAction => ({
  type: c.EAT_USUAL_FOOD,
  coords,
});

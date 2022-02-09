import { AppAction } from '../setup/types';
import { constants as c } from '../setup/constants';

export const gameOver = (): AppAction => ({
  type: c.GAME_OVER,
});

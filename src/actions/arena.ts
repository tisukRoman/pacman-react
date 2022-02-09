import { AppAction } from '../setup/types';
import {constants as c} from '../setup/constants';

export const updateArena = (): AppAction => ({ type: c.UPDATE_ARENA });

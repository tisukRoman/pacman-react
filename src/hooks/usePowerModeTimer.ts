import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { cancellPowerMode } from '../actions/pacman';
import { PacmanState } from '../setup/types';

const usePacmanPowerModeTimer = (pacman: PacmanState) => {
  const powerTime = useRef<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pacman.power && powerTime.current === 0) {
      powerTime.current = 40;
    } else if (pacman.power && powerTime.current > 1) {
      powerTime.current--;
    } else if (pacman.power && powerTime.current === 1) {
      dispatch(cancellPowerMode());
      powerTime.current = 0;
    }
  }, [dispatch, pacman, powerTime]);
};

export default usePacmanPowerModeTimer;

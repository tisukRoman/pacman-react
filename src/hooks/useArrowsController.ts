import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changePacmanDirection } from '../actions/pacman';
import { Direction } from '../setup/types';

const useArrowsController = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
          dispatch(changePacmanDirection(Direction.LEFT));
          break;
        case 'ArrowRight':
          dispatch(changePacmanDirection(Direction.RIGHT));
          break;
        case 'ArrowUp':
          dispatch(changePacmanDirection(Direction.UP));
          break;
        case 'ArrowDown':
          dispatch(changePacmanDirection(Direction.DOWN));
          break;
      }
    };

    window.addEventListener('keydown', keyListener);
    return function clear() {
      window.removeEventListener('keydown', keyListener);
    };
  }, []);
};

export default useArrowsController;

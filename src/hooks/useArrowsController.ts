import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeDirection } from '../actions/pacman';
import { Direction } from '../setup/types';

const useArrowsController = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
          dispatch(changeDirection(Direction.LEFT));
          break;
        case 'ArrowRight':
          dispatch(changeDirection(Direction.RIGHT));
          break;
        case 'ArrowUp':
          dispatch(changeDirection(Direction.UP));
          break;
        case 'ArrowDown':
          dispatch(changeDirection(Direction.DOWN));
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

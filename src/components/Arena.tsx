import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ArenaState, Direction, PacmanState } from '../setup/types';
import { AppState } from '../store';
import { theme } from '../theme';
import Pacman from './Pacman';
import { useEffect } from 'react';
import { changeDirection } from '../actions/pacman';

const ArenaWrapper = styled.div`
  position: absolute;
  width: 1004px;
  height: 1150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid ${theme.COLORS.blue};
  display: flex;
  flex-wrap: wrap;
`;

const Wall = styled.div`
  --size: 50;
  width: calc(var(--size) * 1px);
  height: calc(var(--size) * 1px);
  border: 1px solid ${theme.COLORS.blue};
`;

const Floor = styled.div`
  --size: 50;
  width: calc(var(--size) * 1px);
  height: calc(var(--size) * 1px);
`;

const Arena = () => {
  // prettier-ignore
  const { coords, direction } = useSelector<AppState, PacmanState>(state => state.pacman);
  const { scheme } = useSelector<AppState, ArenaState>((state) => state.arena);
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
  });

  return (
    <ArenaWrapper>
      <Pacman coords={coords} direction={direction} />
      {scheme.map((block) => {
        if (block === 1) {
          return <Wall key={v4()}></Wall>;
        } else {
          return <Floor key={v4()}></Floor>;
        }
      })}
    </ArenaWrapper>
  );
};

export default Arena;

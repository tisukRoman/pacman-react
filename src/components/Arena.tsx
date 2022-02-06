import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ArenaState, Direction, PacmanState } from '../setup/types';
import { AppState } from '../store';
import { theme } from '../theme';
import Pacman from './Pacman';
import { useEffect, useRef } from 'react';
import { changeDirection } from '../actions/pacman';
import useAnimationFrame from '../hooks/useAnimationFrame';
import useArrowsController from '../hooks/useArrowsController';

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

  useArrowsController();
  useAnimationFrame((deltaTime) => {
    console.log(deltaTime);
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

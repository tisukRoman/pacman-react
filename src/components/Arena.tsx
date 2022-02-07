import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ArenaState, PacmanState } from '../setup/types';
import { theme } from '../theme';
import Pacman from './Pacman';
import useArrowsController from '../hooks/useArrowsController';
import { AppState } from '../store';
import useAnimationFrame from '../hooks/useAnimationFrame';
import { movePacman } from '../actions/pacman';
import { useRef } from 'react';

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
  background-color: ${theme.COLORS.dark_blue};
`;

const Floor = styled.div`
  --size: 50;
  width: calc(var(--size) * 1px);
  height: calc(var(--size) * 1px);
`;

const Arena = () => {
  // prettier-ignore
  const { coords, direction } = useSelector<AppState, PacmanState>(state => state.game.pacman);
  const arena = useSelector<AppState, ArenaState>((state) => state.game.arena);
  const dispatch = useDispatch();
  const fps = useRef<number>(0);

  useArrowsController();
  useAnimationFrame((deltaTime) => {
    fps.current++;
    if (fps.current > 15) {
      fps.current = 0;
      dispatch(movePacman());
    }
  });

  return (
    <ArenaWrapper>
      {arena.map((row) => {
        return row.map((block) => {
          if (block === 3) {
            return <Pacman key={v4()} coords={coords} direction={direction} />;
          } else if (block === 1) {
            return <Wall key={v4()}></Wall>;
          } else {
            return <Floor key={v4()}></Floor>;
          }
        });
      })}
    </ArenaWrapper>
  );
};

export default Arena;

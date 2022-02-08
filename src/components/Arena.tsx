import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import styled from 'styled-components';
import { ArenaState, PacmanState } from '../setup/types';
import { theme } from '../theme';
import { AppState } from '../store';
import { movePacman } from '../actions/pacman';
import useAnimationFrame from '../hooks/useAnimationFrame';
import useArrowsController from '../hooks/useArrowsController';
import Pacman from './Pacman';
import Wall from './Wall';
import Floor from './Floor';

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

const Arena = () => {
  // prettier-ignore
  const { coords, direction } = useSelector<AppState, PacmanState>(state => state.game.pacman);
  const arena = useSelector<AppState, ArenaState>((state) => state.game.arena);
  const dispatch = useDispatch();
  const fps = useRef<number>(0);

  useArrowsController();
  useAnimationFrame((deltaTime) => {
    fps.current++;
    if (fps.current > 10) {
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
          } else if (block === 2) {
            return <Floor hasFood key={v4()}></Floor>;
          } else if (block === 7) {
            return <Floor hasPowerFood key={v4()}></Floor>;
          } else {
            return <Floor key={v4()}></Floor>;
          }
        });
      })}
    </ArenaWrapper>
  );
};

export default Arena;

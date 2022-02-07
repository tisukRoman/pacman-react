import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ArenaState, PacmanState } from '../setup/types';
import { theme } from '../theme';
import Pacman from './Pacman';
import useArrowsController from '../hooks/useArrowsController';
import { AppState } from '../store';

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
  const { coords, direction } = useSelector<AppState, PacmanState>(state => state.game.pacman);
  const arena = useSelector<AppState, ArenaState>((state) => state.game.arena);
  const dispatch = useDispatch();

  useArrowsController();
  //useAnimationFrame((deltaTime) => dispatch(movePacman()));

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

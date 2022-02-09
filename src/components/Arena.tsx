import { v4 } from 'uuid';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArenaState, PacmanState, AppState } from '../setup/types';
import { theme } from '../theme';
import useAnimationFrame from '../hooks/useAnimationFrame';
import useArrowsController from '../hooks/useArrowsController';
import { pacmanMoves } from '../redux/helpers';
import Pacman from './Pacman';
import Wall from './Wall';
import Floor from './Floor';
import usePacmanPowerModeTimer from '../hooks/usePowerModeTimer';

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
  const pacman = useSelector<AppState, PacmanState>(state => state.pacman);
  const arena = useSelector<AppState, ArenaState>((state) => state.arena);

  const [animationSpeed, setAnimationSpeed] = useState<number>(0);

  useEffect(() => {
    if (animationSpeed > 6) {
      pacmanMoves(arena, pacman);
      setAnimationSpeed(0);
    }
  }, [animationSpeed, arena, pacman]);

  useAnimationFrame(() => {
    setAnimationSpeed((s) => s + 1);
  });

  usePacmanPowerModeTimer(pacman);
  useArrowsController();

  return (
    <ArenaWrapper>
      {arena.map((row) => {
        return row.map((block) => {
          if (block === 3) {
            return (
              <Pacman
                key={v4()}
                coords={pacman.coords}
                direction={pacman.direction}
                power={pacman.power}
              />
            );
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

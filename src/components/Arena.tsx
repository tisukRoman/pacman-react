import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArenaState, PacmanState, AppState, GhostState } from '../setup/types';
import { theme } from '../theme';
import useAnimationFrame from '../hooks/useAnimationFrame';
import useArrowsController from '../hooks/useArrowsController';
import { ghostMoves, pacmanMoves } from '../redux/helpers';
import Pacman from './Pacman';
import Wall from './Wall';
import Floor from './Floor';
import usePacmanPowerModeTimer from '../hooks/usePowerModeTimer';
import { objects as o } from '../setup/constants';
import Ghost from './Ghost';
import { updateArena } from '../actions/arena';
import { spawnFood } from '../actions/food';

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
  const ghosts = useSelector<AppState, GhostState[]>((state) => state.ghosts);
  const gameLose = useSelector<AppState, boolean>((state) => state.isLose);

  const dispatch = useDispatch();

  const [animationSpeed, setAnimationSpeed] = useState<number>(0);

  useEffect(() => {
    if (!isFoodExist(arena)) {
      dispatch(spawnFood());
    }
  }, [dispatch, arena]);

  useEffect(() => {
    if (animationSpeed > 5 && !gameLose) {
      pacmanMoves(arena, pacman);
      ghosts.forEach((ghost) => ghostMoves(arena, ghost));
      dispatch(updateArena());
      setAnimationSpeed(0);
    }
  }, [dispatch, animationSpeed, arena, pacman, ghosts, gameLose]);

  useAnimationFrame(() => {
    setAnimationSpeed((s) => s + 1);
  });

  usePacmanPowerModeTimer(pacman);
  useArrowsController();

  return (
    <ArenaWrapper>
      {arena.map((row) => {
        return row.map((block) => {
          if (block === o.PACMAN) {
            return (
              <Pacman
                key={v4()}
                coords={pacman.coords}
                direction={pacman.direction}
                power={pacman.power}
              />
            );
          } else if (o.GHOST.includes(block)) {
            return <Ghost key={v4()} isScared={ghosts[0].isScared} />;
          } else if (block === o.WALL) {
            return <Wall key={v4()}></Wall>;
          } else if (block === o.FOOD) {
            return <Floor hasFood key={v4()}></Floor>;
          } else if (block === o.POWER_FOOD) {
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

function isFoodExist(arena: ArenaState): boolean {
  return arena.some((row) => {
    return row.some((item) => item === o.FOOD || item === o.POWER_FOOD);
  });
}

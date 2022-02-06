import { useEffect, useState } from 'react';
import styled from 'styled-components';
import pacmanImage from '../assets/pacman.png';
import { Coords, Direction } from '../setup/types';

type PacmanProps = {
  coords: Coords;
  direction: Direction;
};

const PacmanWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  width: 40px;
  height: 40px;
  top: ${(props: PacmanProps) => props.coords.y + 'px'};
  left: ${(props: PacmanProps) => props.coords.x + 'px'};
  transform: rotate(${(props: PacmanProps) => props.direction});
`;

const PacmanImage = styled.img`
  object-fit: center;
  width: 100%;
`;

const Pacman: React.FC = () => {
  return (
    <PacmanWrapper coords={{ x: 0, y: 0 }} direction={Direction.RIGHT}>
      <PacmanImage src={pacmanImage} alt='pacman' />
    </PacmanWrapper>
  );
};

export default Pacman;

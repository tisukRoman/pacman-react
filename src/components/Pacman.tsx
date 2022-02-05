import { useEffect, useState } from 'react';
import styled from 'styled-components';
import pacmanImage from '../assets/pacman.png';

type Coords = {
  x: number;
  y: number;
};

const LEFT = '-180deg';
const RIGHT = '0deg';
const UP = '-90deg';
const DOWN = '90deg';

type PacmanProps = {
  coords: Coords;
  direction: string;
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
  const [coords, setCoords] = useState<Coords>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<string>(RIGHT);

  useEffect(() => {
    const turn = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
          setDirection(LEFT);
          break;
        case 'ArrowUp':
          setDirection(UP);
          break;
        case 'ArrowRight':
          setDirection(RIGHT);
          break;
        case 'ArrowDown':
          setDirection(DOWN);
          break;
        default:
          return;
      }
    };

    document.addEventListener('keydown', turn);

    return () => {
      document.removeEventListener('keydown', turn);
    };
  }, [direction, coords]);

  return (
    <PacmanWrapper coords={coords} direction={direction}>
      <PacmanImage src={pacmanImage} alt='pacman' />
    </PacmanWrapper>
  );
};

export default Pacman;

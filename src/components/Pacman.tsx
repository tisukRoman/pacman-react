import { useEffect, useState } from 'react';
import styled from 'styled-components';
const pacmanImage = require('../assets/pacman.png');

type PacmanProps = {
  x: number;
  y: number;
};

const PacmanWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100px;
  height: 100px;
  top: ${(props: PacmanProps) => props.y + 'px'};
  left: ${(props: PacmanProps) => props.x + 'px'};
`;

const PacmanImage = styled.img`
  object-fit: center;
  width: 100%;
`;

const Pacman = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const hello = () => setCoords({ x: coords.x + 10, y: coords.y });
    document.addEventListener('click', hello);
    return () => {
      document.removeEventListener('click', hello);
    };
  });

  return (
    <PacmanWrapper x={coords.x} y={coords.y}>
      <PacmanImage src={pacmanImage} alt='pacman' />
    </PacmanWrapper>
  );
};

export default Pacman;

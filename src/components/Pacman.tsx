import styled from 'styled-components';
import pacmanImage from '../assets/pacman.png';
import { Coords, Direction } from '../setup/types';

const PacmanWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  width: 40px;
  height: 40px;
  top: ${(props: PacmanProps) => props.coords.y + '%'};
  left: ${(props: PacmanProps) => props.coords.x + '%'};
  transform: rotate(${(props: PacmanProps) => props.direction});
`;

const PacmanImage = styled.img`
  object-fit: center;
  width: 100%;
`;

type PacmanProps = {
  coords: Coords;
  direction: Direction;
};

const Pacman: React.FC<PacmanProps> = ({ coords, direction }) => {
  return (
    <PacmanWrapper coords={coords} direction={direction}>
      <PacmanImage src={pacmanImage} alt='pacman' />
    </PacmanWrapper>
  );
};

export default Pacman;

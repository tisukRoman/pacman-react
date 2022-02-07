import styled from 'styled-components';
import pacmanImage from '../assets/pac.gif';
import { Coords, Direction } from '../setup/types';

const PacmanWrapper = styled.div`
  overflow: hidden;
  width: 50px;
  height: 50px;
  transform: rotate(${(props: PacmanProps) => turnPacman(props.direction)});
  transition: 0.5s;
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

// Additional functions
function turnPacman(direction: Direction) {
  switch (direction) {
    case Direction.RIGHT:
      return '0deg';
    case Direction.LEFT:
      return '180deg';
    case Direction.UP:
      return '-90deg';
    case Direction.DOWN:
      return '90deg';
    default:
      break;
  }
}

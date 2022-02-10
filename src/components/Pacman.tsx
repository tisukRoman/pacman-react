import styled from 'styled-components';
import pacmanImage from '../assets/pac.gif';
import { Coords, Direction } from '../setup/types';

const PacmanWrapper = styled.div`
  overflow: hidden;
  width: 50px;
  height: 50px;
  transform: rotate(${(props: PacmanProps) => turnPacman(props.direction)})
    scale(${(props: PacmanProps) => (props.power ? 1.4 : 1)});
  transition: 0.5s;
  border-radius: 50%;
`;

const PacmanImage = styled.img`
  object-fit: center;
  width: 100%;
`;

type PacmanProps = {
  coords: Coords;
  direction: Direction;
  power: boolean;
};

const Pacman: React.FC<PacmanProps> = ({ coords, direction, power }) => {
  return (
    <PacmanWrapper coords={coords} direction={direction} power={power}>
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

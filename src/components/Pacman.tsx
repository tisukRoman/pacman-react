import { useSelector } from 'react-redux';
import styled from 'styled-components';
import pacmanImage from '../assets/pacman.png';
import { Coords, Direction } from '../setup/types';
import { AppState } from '../store';

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

type PacmanProps = {
  coords: Coords;
  direction: Direction;
};

const Pacman: React.FC = () => {
  // prettier-ignore
  const {coords, direction} = useSelector<AppState, {coords: Coords, direction: Direction}>(state => state.pacman);

  return (
    <PacmanWrapper coords={coords} direction={direction}>
      <PacmanImage src={pacmanImage} alt='pacman' />
    </PacmanWrapper>
  );
};

export default Pacman;

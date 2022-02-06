import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import pacmanImage from '../assets/pacman.png';
import { PacmanState } from '../setup/types';
import { AppState } from '../store';

const PacmanWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  width: 40px;
  height: 40px;
  top: ${(props: PacmanState) => props.coords.y + '%'};
  left: ${(props: PacmanState) => props.coords.x + '%'};
  transform: rotate(${(props: PacmanState) => props.direction});
`;

const PacmanImage = styled.img`
  object-fit: center;
  width: 100%;
`;

const Pacman: React.FC = () => {
  // prettier-ignore
  const {coords, direction} = useSelector<AppState, PacmanState>(state => state.pacman);

  useEffect(() => {
    const call = (e: KeyboardEvent) => {
      console.log(e);
    };
    window.addEventListener('keydown', call);

    return () => window.removeEventListener('keydown', call);
  });

  return (
    <PacmanWrapper coords={coords} direction={direction}>
      <PacmanImage src={pacmanImage} alt='pacman' />
    </PacmanWrapper>
  );
};

export default Pacman;

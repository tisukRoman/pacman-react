import styled from 'styled-components';
import ghost_src from '../assets/ghost.gif';
import scared_ghost_src from '../assets/scared_ghost.gif';

const GhostWrapper = styled.div`
  overflow: hidden;
  width: 50px;
  height: 50px;
`;

const GhostImage = styled.img`
  object-fit: center;
  width: 100%;
`;

type GhostProps = {
  isScared: boolean;
};

const Ghost: React.FC<GhostProps> = ({ isScared }) => {
  return (
    <GhostWrapper>
      <GhostImage src={isScared ? scared_ghost_src : ghost_src} />
    </GhostWrapper>
  );
};

export default Ghost;

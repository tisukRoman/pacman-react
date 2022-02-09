import styled from 'styled-components';
import ghost_src from '../assets/ghost.gif';

const GhostWrapper = styled.div`
  overflow: hidden;
  width: 50px;
  height: 50px;
`;

const GhostImage = styled.img`
  object-fit: center;
  width: 100%;
`;

const Ghost = () => {
  return (
    <GhostWrapper>
      <GhostImage src={ghost_src} />
    </GhostWrapper>
  );
};

export default Ghost;

import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppState } from '../store';
import { theme } from '../theme';

const ArenaWrapper = styled.div`
  position: absolute;
  width: 1004px;
  height: 1150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid ${theme.COLORS.blue};
  display: flex;
  flex-wrap: wrap;
`;

const Wall = styled.div`
  --size: 50;
  width: calc(var(--size) * 1px);
  height: calc(var(--size) * 1px);
  border: 1px solid ${theme.COLORS.blue};
`;

const Floor = styled.div`
  --size: 50;
  width: calc(var(--size) * 1px);
  height: calc(var(--size) * 1px);
`;

const Arena = () => {
  const scheme = useSelector<AppState, number[]>((state) => state.arena.scheme);

  return (
    <ArenaWrapper>
      {scheme.map((block) => {
        if (block === 1) {
          return <Wall></Wall>;
        } else {
          return <Floor></Floor>;
        }
      })}
    </ArenaWrapper>
  );
};

export default Arena;

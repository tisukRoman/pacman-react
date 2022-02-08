import styled from 'styled-components';
import { theme } from '../theme';

const WallWrapper = styled.div`
  --size: 50;
  width: calc(var(--size) * 1px);
  height: calc(var(--size) * 1px);
  border: 1px solid ${theme.COLORS.blue};
  background-color: ${theme.COLORS.dark_blue};
`;

const Wall: React.FC = () => {
  return <WallWrapper></WallWrapper>;
};

export default Wall;
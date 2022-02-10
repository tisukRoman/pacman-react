import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppState } from '../setup/types';
import { theme } from '../theme';

const HeaderWrapper = styled.header`
  border: 5px solid ${theme.COLORS.blue};
  color: #fff;
  text-align: center;
  height: 3em;
  line-height: 3em;
  font-size: 3rem;
  width: 1005px;
  margin: 1em auto;
`;

const Header = () => {
  const currentScore = useSelector<AppState, number>((state) => state.currentScore);

  return <HeaderWrapper>Текущий рекорд: {currentScore}</HeaderWrapper>;
};

export default Header;

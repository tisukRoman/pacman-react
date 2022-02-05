import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../theme';

const HeaderWrapper = styled.div`
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
  const [title, setTitle] = useState<string>('GAME OVER!');

  return <HeaderWrapper>{title}</HeaderWrapper>;
};

export default Header;

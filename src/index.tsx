import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { theme, Global } from './theme';
import App from './App';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Global />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

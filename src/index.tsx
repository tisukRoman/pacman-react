import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { theme, Global } from './theme';
import { store } from './store';
import App from './App';

ReactDOM.render(
  <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
        <Global />
      </ThemeProvider>
    </Provider>
  </>,
  document.getElementById('root')
);

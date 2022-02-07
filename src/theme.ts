import { createGlobalStyle } from 'styled-components';

//-----------------------------// Themes
const theme = {
  COLORS: {
    black: '#111',
    blue: '#00b',
  },
  FONT: {
    pixel: `'Press Start 2P', cursive`,
  },
};
//------------------------------// Global styles
const Global = createGlobalStyle`
    html{
        font-size: 1em;
        overflow: hidden;
        font-family: ${theme.FONT.pixel};
        background-image: url(https://static-cse.canva.com/image/124987/Minimal-Patterns-Sound-Waves-Wallpaper.png);
        background-repeat: no-repeat;
        background-size: cover;
    };

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: ${theme.COLORS.black};
    };
`;

export { Global, theme };

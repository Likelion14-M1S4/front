import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    overscroll-behavior-y: none;
  }

  body {
    margin: 0;
    font-family:
      'SD Minburi',
      'SD 민부리',
      'SD Minburi Space3',
      'Apple SD Gothic Neo',
      sans-serif;
    color: #000000;
    background-color: #ffffff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img {
    max-width: 100%;
    display: block;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font: inherit;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
  }
`;

export default GlobalStyle;

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    overscroll-behavior-y: none;
    /* 1rem = 16px 기준. 390px 뷰포트에서 정확히 16px이 되고,
       화면 폭에 비례해 유동적으로 커지거나 작아지되 14px~17px 범위로 고정됩니다. */
    font-size: clamp(14px, 4.1vw, 17px);
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

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Thin.woff2') format('woff2');
    font-weight: 100;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraLight.woff2') format('woff2');
    font-weight: 200;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Light.woff2') format('woff2');
    font-weight: 300;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Regular.woff2') format('woff2');
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Medium.woff2') format('woff2');
    font-weight: 500;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Bold.woff2') format('woff2');
    font-weight: 700;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraBold.woff2') format('woff2');
    font-weight: 800;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Black.woff2') format('woff2');
    font-weight: 900;
    font-display: swap;
  }

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
    font-family: 'Pretendard', sans-serif;
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

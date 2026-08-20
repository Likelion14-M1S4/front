import { Link } from 'react-router-dom';
import styled from 'styled-components';
import mcmLogo from '../../../assets/icons/nav/header/mcm.svg';
import { APP_MAX_WIDTH_REM, HEADER_HEIGHT_REM } from '../../../styles/theme';

const HeaderBar = styled.header`
  position: absolute;
  inset: 0 0 auto 0;
  z-index: 50;
  display: flex;
  height: ${HEADER_HEIGHT_REM}rem;
  width: min(100vw, ${APP_MAX_WIDTH_REM}rem);
  align-items: center;
  justify-content: center;
  padding-top: 0.75rem;
  background: #ffffff;
  box-sizing: border-box;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 3.5625rem;
  width: 3.5625rem;
`;

// 모든 페이지 상단에 고정되는 헤더 — 중앙 MCM 로고만 표시
function Header() {
  return (
    <HeaderBar>
      <LogoLink to="/home" aria-label="홈으로 이동">
        <LogoImage src={mcmLogo} alt="MCM" />
      </LogoLink>
    </HeaderBar>
  );
}

export default Header;

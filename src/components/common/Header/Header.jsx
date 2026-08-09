import { Link } from 'react-router-dom';
import styled from 'styled-components';
import mcmLogo from '../../../assets/icons/nav/header/mcm.svg';
import { APP_WIDTH } from '../../../styles/theme';

const HeaderBar = styled.header`
  position: absolute;
  inset: 0 0 auto 0;
  z-index: 50;
  display: flex;
  height: 80px;
  width: ${APP_WIDTH}px;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 12px;
  background: #ffffff;
  box-sizing: border-box;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 57px;
  width: 57px;
`;

// 모든 페이지 상단에 고정되는 헤더 — 중앙 MCM 로고만 표시
function Header() {
  return (
    <HeaderBar>
      <LogoLink to="/" aria-label="홈으로 이동">
        <LogoImage src={mcmLogo} alt="MCM" />
      </LogoLink>
    </HeaderBar>
  );
}

export default Header;

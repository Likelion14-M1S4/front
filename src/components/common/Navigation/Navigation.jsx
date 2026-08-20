import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { navigationItems } from './navigationItems';
import { APP_MAX_WIDTH_REM } from '../../../styles/theme';

const Nav = styled.nav`
  pointer-events: none;
  position: absolute;
  inset: auto 0 0 0;
  z-index: 50;
  display: flex;
  width: min(100vw, ${APP_MAX_WIDTH_REM}rem);
  justify-content: center;
  padding: 0 1rem 1rem;
  box-sizing: border-box;
`;

const NavBar = styled.div`
  pointer-events: auto;
  display: flex;
  height: 4rem;
  width: 100%;
  max-width: 22.375rem;
  align-items: center;
  justify-content: space-around;
  border-radius: 9999px;
  background: #ffffff;
  padding: 0 0.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
`;

const Item = styled(NavLink)`
  display: flex;
  height: 3rem;
  width: 3rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  height: 1.375rem;
  width: 1.375rem;
  transition: transform 0.2s;
  transform: ${({ $active }) => ($active ? 'translateY(-0.1875rem)' : 'none')};
`;

const Dot = styled.span`
  margin-top: 0.125rem;
  height: 0.25rem;
  width: 0.25rem;
  border-radius: 9999px;
  background: ${({ $active }) => ($active ? '#6f5b4d' : 'transparent')};
`;

// 하단 플로팅 캡슐형 네비게이션 — 아이콘만 표시
function Navigation() {
  return (
    <Nav>
      <NavBar>
        {navigationItems.map(({ label, path, icon, inactiveIcon }) => (
          <Item key={path} to={path} end={path === '/'} aria-label={label}>
            {({ isActive }) => (
              <>
                <Icon
                  src={isActive ? icon : inactiveIcon}
                  alt=""
                  aria-hidden
                  $active={isActive}
                />
                <Dot $active={isActive} />
              </>
            )}
          </Item>
        ))}
      </NavBar>
    </Nav>
  );
}

export default Navigation;

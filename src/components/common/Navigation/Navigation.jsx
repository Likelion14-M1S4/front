import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { navigationItems } from './navigationItems';
import { APP_WIDTH } from '../../../styles/theme';

const Nav = styled.nav`
  pointer-events: none;
  position: absolute;
  inset: auto 0 0 0;
  z-index: 50;
  display: flex;
  width: ${APP_WIDTH}px;
  max-width: 100%;
  justify-content: center;
  padding: 0 16px 16px;
  box-sizing: border-box;
`;

const NavBar = styled.div`
  pointer-events: auto;
  display: flex;
  height: 64px;
  width: 100%;
  max-width: 358px;
  align-items: center;
  justify-content: space-around;
  border-radius: 9999px;
  background: #ffffff;
  padding: 0 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
`;

const Item = styled(NavLink)`
  display: flex;
  height: 48px;
  width: 48px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  height: 22px;
  width: 22px;
  transition: transform 0.2s;
  transform: ${({ $active }) => ($active ? 'translateY(-3px)' : 'none')};
`;

const Dot = styled.span`
  margin-top: 2px;
  height: 4px;
  width: 4px;
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

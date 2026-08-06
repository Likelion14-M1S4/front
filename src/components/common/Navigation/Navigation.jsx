import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { HiMenu, HiX } from 'react-icons/hi';

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: fixed;
    top: ${({ theme }) => theme.layout.headerHeight};
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 16px;
    background-color: ${({ theme }) => theme.colors.background};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadows.default};
    transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-110%')});
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    transition: transform 0.25s ease, opacity 0.25s ease, visibility 0.25s;
    z-index: 100;
  }
`;

const NavItem = styled.li`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.accentBg};
  }

  &.active {
    color: ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.accentBg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 12px 16px;
  }
`;

const MenuToggle = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textHeading};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: inline-flex;
  }
`;

const defaultNavItems = [
  { label: '홈', path: '/' },
  { label: '소개', path: '/about' },
  { label: '프로젝트', path: '/projects' },
  { label: '멤버', path: '/members' },
];

function Navigation({ items = defaultNavItems }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Nav aria-label="메인 네비게이션">
      <MenuToggle
        type="button"
        aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <HiX size={22} /> : <HiMenu size={22} />}
      </MenuToggle>

      <NavList $isOpen={isOpen}>
        {items.map(({ label, path }) => (
          <NavItem key={path}>
            <StyledNavLink to={path} end={path === '/'} onClick={handleLinkClick}>
              {label}
            </StyledNavLink>
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );
}

export default Navigation;

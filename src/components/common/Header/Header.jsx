import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../Navigation/Navigation';

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 200;
  height: ${({ theme }) => theme.layout.headerHeight};
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textHeading};
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const LogoMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 700;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

function Header({
  logoText = 'LikeLion',
  logoShort = 'LL',
  navItems,
  actions,
}) {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <LogoLink to="/">
          <LogoMark aria-hidden="true">{logoShort}</LogoMark>
          {logoText}
        </LogoLink>

        <Navigation items={navItems} />

        {actions && <Actions>{actions}</Actions>}
      </HeaderInner>
    </HeaderWrapper>
  );
}

export default Header;

import styled from 'styled-components';

const FooterWrapper = styled.footer`
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
`;

const FooterInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 24px;
`;

const Copyright = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const FooterLink = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

function Footer({
  copyright = `© ${new Date().getFullYear()} LikeLion 14th. All rights reserved.`,
  links = [],
}) {
  return (
    <FooterWrapper>
      <FooterInner>
        <Copyright>{copyright}</Copyright>
        {links.length > 0 && (
          <Links>
            {links.map(({ label, href }) => (
              <FooterLink key={href} href={href} target="_blank" rel="noreferrer">
                {label}
              </FooterLink>
            ))}
          </Links>
        )}
      </FooterInner>
    </FooterWrapper>
  );
}

export default Footer;

import styled from 'styled-components';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 32px 24px;
`;

function Layout({
  children,
  headerProps,
  footerProps,
  hideHeader = false,
  hideFooter = false,
}) {
  return (
    <Page>
      {!hideHeader && <Header {...headerProps} />}
      <Main>{children}</Main>
      {!hideFooter && <Footer {...footerProps} />}
    </Page>
  );
}

export default Layout;

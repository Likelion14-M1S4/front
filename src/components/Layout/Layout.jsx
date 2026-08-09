import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../common/Header/Header';
import Navigation from '../common/Navigation/Navigation';
import { APP_WIDTH } from '../../styles/theme';

const PageShell = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  background: #ffffff;
`;

const AppFrame = styled.div`
  position: relative;
  display: flex;
  height: 100dvh;
  width: ${APP_WIDTH}px;
  max-width: 100%;
  flex-shrink: 0;
  flex-direction: column;
  overflow: hidden;
  background: #ffffff;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  overflow-y: ${({ $fullBleed }) => ($fullBleed ? 'hidden' : 'auto')};
  overscroll-behavior: contain;
  padding-top: ${({ $hideHeader }) => ($hideHeader ? '0' : '80px')};
  padding-bottom: ${({ $hideNav }) => ($hideNav ? '0' : '96px')};
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// 390px 고정 프레임 — 모든 페이지는 이 컨테이너 안에서만 렌더링됩니다.
// 라우트가 바뀌어도 프레임(헤더·네비)은 유지되고 main 영역만 교체됩니다.
function Layout({ children }) {
  const { pathname } = useLocation();
  const isCollectionDetail = /^\/collection\/[^/]+$/.test(pathname);
  const isCharacterChat = /^\/collection\/[^/]+\/chat$/.test(pathname);
  const hideHeader = isCollectionDetail || isCharacterChat;
  const hideNav = isCharacterChat;

  return (
    <PageShell>
      <AppFrame id="app-frame">
        {!hideHeader && <Header />}
        <Main $hideHeader={hideHeader} $hideNav={hideNav} $fullBleed={isCharacterChat}>
          {children}
        </Main>
        {!hideNav && <Navigation />}
      </AppFrame>
    </PageShell>
  );
}

export default Layout;

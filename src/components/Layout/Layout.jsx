import Header from '../common/Header/Header';
import Navigation from '../common/Navigation/Navigation';

// 390px 고정 프레임 — 모든 페이지는 이 컨테이너 안에서만 렌더링됩니다.
// 라우트가 바뀌어도 프레임(헤더·네비)은 유지되고 main 영역만 교체됩니다.
function Layout({ children }) {
  return (
    <div className="flex min-h-screen justify-center bg-mcm-ivory">
      <div
        id="app-frame"
        className="relative flex h-dvh w-app shrink-0 flex-col overflow-hidden bg-mcm-ivory"
      >
        <Header />

        {/* 하단 네비(80px) 위에 콘텐츠가 스크롤되도록 여백 확보 */}
        <main className="scrollbar-hide flex-1 overflow-y-auto overscroll-contain pt-[64px] pb-[80px]">
          {children}
        </main>

        <Navigation />
      </div>
    </div>
  );
}

export default Layout;

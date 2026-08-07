import HeroBannerSection from './HeroBannerSection';
import StorySection from './StorySection';
import RecommendedProductSection from './RecommendedProductSection';

// 홈 페이지
// 페이지 컴포넌트는 섹션들을 순서대로 배치하는 역할만 담당합니다.
function Home() {
  return (
    <div className="pb-10">
      <HeroBannerSection />
      <StorySection />
      <RecommendedProductSection />
    </div>
  );
}

export default Home;

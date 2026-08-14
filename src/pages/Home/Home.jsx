import styled from 'styled-components';
import HeroBannerSection from './HeroBannerSection';
import StorySection from './StorySection';
import RecommendedProductSection from './RecommendedProductSection';
import { APP_MAX_WIDTH_REM } from '../../styles/theme';

const Page = styled.div`
  width: 100%;
  max-width: ${APP_MAX_WIDTH_REM}rem;
  margin: 0 auto;
  padding-bottom: 1rem;
  box-sizing: border-box;
`;

// 홈 페이지
// 페이지 컴포넌트는 섹션들을 순서대로 배치하는 역할만 담당합니다.
function Home() {
  return (
    <Page>
      <HeroBannerSection />
      <StorySection />
      <RecommendedProductSection />
    </Page>
  );
}

export default Home;

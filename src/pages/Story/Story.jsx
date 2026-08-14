import styled from 'styled-components';
import SeasonIntroSection from './SeasonIntroSection';
import PastSeasonStorySection from './PastSeasonStorySection';

// 페이지 좌우 기본 여백(1.25rem) — 각 섹션은 필요 시 여기서 상쇄해 풀블리드 처리
const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 1.25rem 2.5rem;
`;

// 스토리 페이지 — 섹션들을 순서대로 배치하는 역할만 담당
function Story() {
  return (
    <Page>
      <SeasonIntroSection />
      <PastSeasonStorySection />
    </Page>
  );
}

export default Story;

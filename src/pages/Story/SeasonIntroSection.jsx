import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { seasonStory } from '../../mock/story';
import seasonStoryBg from '../../assets/icons/nav/story/stroy-season_story.svg';

// 시즌 소개 박스 — 풀블리드 배경 박스
const Box = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% + 2.5rem);
  height: 36.875rem;
  margin: 0 -1.25rem;
  padding: 21.5rem 1.25rem 0;
  background: url(${seasonStoryBg}) center / cover no-repeat;
  box-sizing: border-box;
`;

const Season = styled.p`
  margin: 0;
  color: black;
  font-size: 1.25rem;
  font-family: 'Pretendard';
  font-weight: 500;
  line-height: 1.421875rem;
  word-wrap: break-word;
`;

const Title = styled.h1`
  margin: 2rem 0 0;
  color: black;
  font-size: 2rem;
  font-family: 'Pretendard';
  font-weight: 600;
  line-height: 1.421875rem;
  word-wrap: break-word;
`;

const CtaButton = styled.button`
  margin: 4.125rem 0 0;
  padding: 0;
  border: none;
  background: none;
  color: black;
  font-size: 1.25rem;
  font-family: 'Pretendard';
  font-weight: 500;
  line-height: 1.421875rem;
  cursor: pointer;
`;

const Divider = styled.span`
  display: block;
  width: 8.75rem;
  height: 1px;
  margin: 0.8125rem 0 0;
  background-color: #000000;
`;

// 스토리 페이지 상단 — 시즌 소개 박스 + 스토리 진행 CTA
function SeasonIntroSection() {
  const navigate = useNavigate();

  return (
    <Box>
      <Season>{seasonStory.season}</Season>
      <Title>{seasonStory.title}</Title>
      <CtaButton type="button" onClick={() => navigate('/story/chapter')}>
        {seasonStory.ctaLabel}
      </CtaButton>
      <Divider aria-hidden />
    </Box>
  );
}

export default SeasonIntroSection;
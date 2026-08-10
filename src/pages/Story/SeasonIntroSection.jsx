import styled from 'styled-components';
import { seasonStory } from '../../mock/story';

// 시즌 소개 박스 — 풀블리드 배경 박스. 하단 썸네일이 경계에 걸치도록 relative 기준
const Box = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% + 40px);
  height: 590px;
  margin: 0 -20px;
  padding: 344px 20px 0;
  background: linear-gradient(180deg, #f6f4f2 0%, #f9f8f7 61.11%, #ffffff 100%);
  box-sizing: border-box;
`;

const Season = styled.p`
  margin: 0;
  color: black;
  font-size: 20px;
  font-family: 'SD Minburi';
  font-weight: 500;
  line-height: 22.75px;
  word-wrap: break-word;
`;

const Title = styled.h1`
  margin: 32px 0 0;
  color: black;
  font-size: 32px;
  font-family: 'SD Minburi';
  font-weight: 600;
  line-height: 22.75px;
  word-wrap: break-word;
`;

const CtaButton = styled.button`
  margin: 66px 0 0;
  padding: 0;
  border: none;
  background: none;
  color: black;
  font-size: 20px;
  font-family: 'SD Minburi';
  font-weight: 500;
  line-height: 22.75px;
  cursor: pointer;
`;

const Divider = styled.span`
  display: block;
  width: 140px;
  height: 1px;
  margin: 13px 0 0;
  background-color: #000000;
`;

// 박스 하단 경계에 절반 걸치는 정사각형 썸네일
const Thumbnail = styled.div`
  position: absolute;
  left: 50%;
  bottom: -27px;
  transform: translateX(-50%);
  width: 64px;
  height: 64px;
  overflow: hidden;
  background: #f2f2f2;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 스토리 페이지 상단 — 시즌 소개 박스 + 스토리 진행 CTA + 경계 썸네일
function SeasonIntroSection() {
  return (
    <Box>
      <Season>{seasonStory.season}</Season>
      <Title>{seasonStory.title}</Title>
      <CtaButton type="button">{seasonStory.ctaLabel}</CtaButton>
      <Divider aria-hidden />

      <Thumbnail>
        {seasonStory.thumbnailUrl ? (
          <ThumbnailImage src={seasonStory.thumbnailUrl} alt={seasonStory.title} />
        ) : null}
      </Thumbnail>
    </Box>
  );
}

export default SeasonIntroSection;
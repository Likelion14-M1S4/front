import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { chapterContents } from '../../mock/storyChapter';
import xIcon from '../../assets/icons/nav/Xicon.svg';
import storylineImg from '../../assets/icons/nav/storyline.svg';

// 전체 화면 — 회색 배경(추후 이미지로 교체)
const Page = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #b0aca8;
`;

// 상단 진행 바 (여러 세그먼트)
const ProgressBar = styled.div`
  display: flex;
  gap: 8px;
  width: calc(100% - 46px);
  margin: 32px 23px 0;
`;

const Segment = styled.div`
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: ${({ $active }) =>
    $active ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
`;

// 닫기 버튼
const CloseButton = styled.button`
  align-self: flex-end;
  margin: 20px 23px 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const CloseIcon = styled.img`
  width: 24px;
  height: 24px;
`;

// 하단 설명 박스 위에 살짝 걸치는 작은 썸네일 (추후 이미지)
const Thumbnail = styled.div`
  width: 64px;
  height: 80px;
  margin: auto 0 -16px 23px;
  background: #f2f2f2;
`;

// 하단 설명 박스
const InfoBox = styled.div`
  margin: 0 23px 40px;
  padding: 28px 24px;
  background: #eeeeee;
`;

const InfoText = styled.p`
  margin: 0;
  color: #333333;
  font-size: 15px;
  font-family: 'SD Minburi';
  font-weight: 400;
  line-height: 1.7;
`;

// 스토리 뷰어 페이지 — URL의 id로 챕터 구분
function StoryView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const content = chapterContents[id];

  if (!content) {
    return (
    <Page>
        <CloseButton type="button" onClick={() => navigate(-1)} aria-label="닫기">
            <CloseIcon src={xIcon} alt="" aria-hidden />
        </CloseButton>

        <InfoBox>
            <InfoText>스토리 내용을 찾을 수 없어요.</InfoText>
        </InfoBox>
    </Page>
    );
  }

  return (
    <Page>
        {/* 진행 바 — slideCount 만큼 세그먼트, 현재 슬라이드까지 활성 */}
        <ProgressBar>
        {Array.from({ length: content.slideCount }).map((_, index) => (
            <Segment key={index} $active={index === 0} />
        ))}
        </ProgressBar>

        {/* 닫기 버튼 */}
        <CloseButton type="button" onClick={() => navigate(-1)} aria-label="닫기">
            <CloseIcon src={xIcon} alt="" aria-hidden />
        </CloseButton>

        {/* 이미지 자리 (박스) */}
        <Thumbnail />

        {/* 하단 설명 박스 */}
        <InfoBox>
            <InfoText>{content.text}</InfoText>
        </InfoBox>
    </Page>
  );
}

export default StoryView;
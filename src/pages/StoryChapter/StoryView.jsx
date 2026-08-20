import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { completeChapter, getStoryById } from '../../api/storyProgress';
import xIcon from '../../assets/icons/nav/Xicon.svg';

// 전체 화면 — 슬라이드 이미지 없으면 회색 배경으로 대체
const Page = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #b0aca8;
  overflow: hidden;
`;

// 슬라이드 배경 이미지 — Page를 꽉 채우고 탭 존/오버레이 뒤에 깔림
const SlideImage = styled.img`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 화면 왼쪽 절반 — 누르면 이전 스토리
const TapZoneLeft = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 50%;
  z-index: 1;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

// 화면 오른쪽 절반 — 누르면 다음 스토리
const TapZoneRight = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 50%;
  z-index: 1;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

// 실제 화면 요소(진행 바·닫기·설명 박스) — 탭 존 위에 얹혀서, 빈 공간은 탭이 통과되도록 pointer-events: none
const UIOverlay = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex: 1;
  pointer-events: none;
`;

// 상단 진행 바 (여러 세그먼트) — 지나온 슬라이드까지 흰색으로 채워짐
const ProgressBar = styled.div`
  display: flex;
  gap: 0.5rem;
  width: calc(100% - 2.875rem);
  margin: 2rem 1.4375rem 0;
`;

const Segment = styled.div`
  flex: 1;
  height: 0.125rem;
  border-radius: 2px;
  background: ${({ $active }) =>
    $active ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
`;

// 닫기 버튼
const CloseButton = styled.button`
  align-self: flex-end;
  margin: 1.25rem 1.4375rem 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  pointer-events: auto;
`;

const CloseIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

// 하단 설명 박스 위에 살짝 걸치는 썸네일 — 캐릭터 사진
const Thumbnail = styled.div`
  position: relative;
  z-index: 1;
  width: 4rem;
  height: 5rem;
  margin: auto 0 -1.125rem 2.125rem;
  overflow: hidden;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoBox = styled.div`
  margin: 0 1.0625rem 3.5rem;
  padding: 2.125rem 1.25rem;
  background: rgb(255 255 255 / 70%);
  border-radius: 5px;
  pointer-events: none;
`;

const InfoText = styled.p`
  margin: 0;
  color: #333333;
  font-size: 0.9375rem;
  font-family: 'Pretendard';
  font-weight: 400;
  line-height: 1.7;
`;

// 스토리 뷰어 페이지 — URL의 id로 챕터 구분, 슬라이드는 왼쪽/오른쪽 탭으로 이동
function StoryView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chapter, setChapter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setSlideIndex(0);

    getStoryById(id)
      .then((data) => {
        if (isMounted) setChapter(data);
      })
      .catch(() => {
        if (isMounted) setChapter(null);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const slides = chapter?.slides ?? [];

  if (isLoading) {
    return (
      <Page>
        <UIOverlay>
          <CloseButton type="button" onClick={() => navigate(-1)} aria-label="닫기">
            <CloseIcon src={xIcon} alt="" aria-hidden />
          </CloseButton>
          <InfoBox>
            <InfoText>불러오는 중이에요.</InfoText>
          </InfoBox>
        </UIOverlay>
      </Page>
    );
  }

  if (!chapter || slides.length === 0) {
    return (
      <Page>
        <UIOverlay>
          <CloseButton type="button" onClick={() => navigate(-1)} aria-label="닫기">
            <CloseIcon src={xIcon} alt="" aria-hidden />
          </CloseButton>

          <InfoBox>
            <InfoText>스토리 내용을 찾을 수 없어요.</InfoText>
          </InfoBox>
        </UIOverlay>
      </Page>
    );
  }

  const currentSlide = slides[slideIndex];

  const goToPrevSlide = () => {
    setSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToNextSlide = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex((prev) => prev + 1);
      return;
    }
    completeChapter(chapter.id).then((result) => {
      if (result.isSeasonCompleted) {
        navigate(`/story/view/${id}/complete`, {
          replace: true,
          state: { charms: result.charms },
        });
        return;
      }
      navigate('/story/chapter', { replace: true });
    });
  };

  return (
    <Page>
      {currentSlide.imageUrl ? <SlideImage src={currentSlide.imageUrl} alt="" /> : null}

      <TapZoneLeft type="button" onClick={goToPrevSlide} aria-label="이전 스토리" />
      <TapZoneRight type="button" onClick={goToNextSlide} aria-label="다음 스토리" />

      <UIOverlay>
        {/* 진행 바 — 슬라이드 개수만큼 세그먼트, 지나온 슬라이드까지 채움 */}
        <ProgressBar>
          {slides.map((slide, index) => (
            <Segment key={slide.id} $active={index <= slideIndex} />
          ))}
        </ProgressBar>

        <CloseButton type="button" onClick={() => navigate(-1)} aria-label="닫기">
          <CloseIcon src={xIcon} alt="" aria-hidden />
        </CloseButton>

        <Thumbnail>
          {chapter.characterImgUrl ? (
            <ThumbnailImage src={chapter.characterImgUrl} alt={chapter.characterName} />
          ) : null}
        </Thumbnail>

        <InfoBox>
          <InfoText>{currentSlide.text}</InfoText>
        </InfoBox>
      </UIOverlay>
    </Page>
  );
}

export default StoryView;

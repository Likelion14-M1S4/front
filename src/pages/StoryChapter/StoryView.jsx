import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { chapters } from '../../mock/storyChapter';
import { completeChapter } from '../../api/storyProgress';
import xIcon from '../../assets/icons/nav/Xicon.svg';

// 전체 화면 — 회색 배경(추후 이미지로 교체)
const Page = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #b0aca8;
  overflow: hidden;
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
  gap: 8px;
  width: calc(100% - 46px);
  margin: 32px 23px 0;
`;

const Segment = styled.div`
  flex: 1;
  height: 2px;
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
  pointer-events: auto;
`;

const CloseIcon = styled.img`
  width: 24px;
  height: 24px;
`;

// 하단 설명 박스 위에 살짝 걸치는 썸네일 — 추후 캐릭터 사진이 들어갈 자리
const Thumbnail = styled.div`
  width: 64px;
  height: 80px;
  margin: auto 0 -18px 34px;
  background: #ffffff;
`;

// 하단 설명 박스 — 선택지 슬라이드일 때만 탭이 여기서 멈추도록(pointer-events: auto) 처리
const InfoBox = styled.div`
  margin: 0 17px 56px;
  padding: 34px 20px;
  background: rgb(255 255 255 / 70%);
  border-radius: 5px;
  pointer-events: ${({ $interactive }) => ($interactive ? 'auto' : 'none')};
  cursor: ${({ $dismissible }) => ($dismissible ? 'pointer' : 'default')};
`;

const InfoText = styled.p`
  margin: 0;
  color: #333333;
  font-size: 15px;
  font-family: 'SD Minburi';
  font-weight: 400;
  line-height: 1.7;
`;

// 선택지 프롬프트 — 답변과 8px 간격
const Prompt = styled.p`
  margin: 0 0 16px;
  color: #333333;
  font-size: 15px;
  font-family: 'SD Minburi';
  font-weight: 500;
  line-height: 1.7;
`;

const ChoiceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ChoiceButton = styled.button`
  padding: 12px 16px;
  border: 1px solid #ffffff;
  background: #ffffff;
  color: #000000;
  font-size: 16px;
  font-family: 'SD Minburi';
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  
  &:disabled {
    border-color: #cccccc;
    background-color: #DADADA;
    color: #7F7F7F;
    cursor: not-allowed;
  }
`;

// 스토리 뷰어 페이지 — URL의 id로 챕터 구분, 슬라이드는 왼쪽/오른쪽 탭으로 이동
function StoryView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const chapter = chapters.find((item) => item.id === Number(id));
  const slides = chapter?.slides ?? [];

  const [slideIndex, setSlideIndex] = useState(0);
  const [activeChoiceId, setActiveChoiceId] = useState(null);
  // 슬라이드별로 이미 답한 선택지 id 목록 — 다시 그 슬라이드로 돌아와도 비활성 상태 유지
  const [answeredBySlide, setAnsweredBySlide] = useState({});

  // 챕터가 바뀌면 처음 슬라이드부터 다시 시작
  useEffect(() => {
    setSlideIndex(0);
    setActiveChoiceId(null);
    setAnsweredBySlide({});
  }, [id]);

  // 슬라이드가 바뀌면 항상 선택지 목록부터 보여줌
  useEffect(() => {
    setActiveChoiceId(null);
  }, [slideIndex]);

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
  const isChoiceSlide = currentSlide.type === 'choice';
  const isViewingAnswer = isChoiceSlide && activeChoiceId !== null;
  const answeredIds = answeredBySlide[currentSlide.id] ?? [];
  // 선택지 슬라이드는 모든 선택지를 다 물어봐야 다음으로 넘어갈 수 있음
  const isChoiceIncomplete = isChoiceSlide && answeredIds.length < currentSlide.choices.length;

  // 선택지 답변을 보는 중엔 좌우 탭 모두 선택지 화면으로 되돌아감
  const goToPrevSlide = () => {
    if (isViewingAnswer) {
      setActiveChoiceId(null);
      return;
    }
    setSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToNextSlide = () => {
    if (isViewingAnswer) {
      setActiveChoiceId(null);
      return;
    }
    if (isChoiceIncomplete) {
      // 선택지를 다 안 물어봤으면 다음으로 못 넘어감
      return;
    }
    if (slideIndex < slides.length - 1) {
      setSlideIndex((prev) => prev + 1);
      return;
    }
    // 마지막 슬라이드 — 챕터 완료 처리 후 이동
    // 마지막 챕터만 완료 화면(제품 추천 등)으로, 그 전 챕터들은 챕터 목록으로 복귀
    const isLastChapter = chapters[chapters.length - 1]?.id === chapter.id;
    completeChapter(chapter.id).then(() => {
      navigate(isLastChapter ? `/story/view/${id}/complete` : '/story/chapter');
    });
  };

  const handleChoiceSelect = (choiceId) => {
    setActiveChoiceId(choiceId);
    setAnsweredBySlide((prev) => {
      const answered = new Set(prev[currentSlide.id] ?? []);
      answered.add(choiceId);
      return { ...prev, [currentSlide.id]: Array.from(answered) };
    });
  };

  return (
    <Page>
      <TapZoneLeft type="button" onClick={goToPrevSlide} aria-label="이전 스토리" />
      <TapZoneRight type="button" onClick={goToNextSlide} aria-label="다음 스토리" />

      <UIOverlay>
        {/* 진행 바 — 슬라이드 개수만큼 세그먼트, 지나온 슬라이드까지 채움 */}
        <ProgressBar>
          {slides.map((slide, index) => (
            <Segment key={slide.id} $active={index <= slideIndex} />
          ))}
        </ProgressBar>

        {/* 닫기 버튼 */}
        <CloseButton type="button" onClick={() => navigate(-1)} aria-label="닫기">
          <CloseIcon src={xIcon} alt="" aria-hidden />
        </CloseButton>

        {/* 이미지 자리 (박스) */}
        <Thumbnail />

        {/* 하단 설명 박스 */}
        {isChoiceSlide ? (
          <InfoBox
            $interactive
            $dismissible={isViewingAnswer}
            onClick={isViewingAnswer ? () => setActiveChoiceId(null) : undefined}
          >
            {isViewingAnswer ? (
              <InfoText>
                {currentSlide.choices.find((choice) => choice.id === activeChoiceId)?.answer}
              </InfoText>
            ) : (
              <>
                <Prompt>{currentSlide.prompt}</Prompt>
                <ChoiceList>
                  {currentSlide.choices.map((choice) => (
                    <ChoiceButton
                      key={choice.id}
                      type="button"
                      disabled={answeredIds.includes(choice.id)}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleChoiceSelect(choice.id);
                      }}
                    >
                      {choice.label}
                    </ChoiceButton>
                  ))}
                </ChoiceList>
              </>
            )}
          </InfoBox>
        ) : (
          <InfoBox>
            <InfoText>{currentSlide.text}</InfoText>
          </InfoBox>
        )}
      </UIOverlay>
    </Page>
  );
}

export default StoryView;

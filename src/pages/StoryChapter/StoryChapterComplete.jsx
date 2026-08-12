import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { chapters } from '../../mock/storyChapter';
import { useRecommendedProducts } from '../../hooks/useRecommendedProducts';
import longEllipse from '../../assets/icons/nav/long_ellipse.svg';
import grayCircle from '../../assets/icons/nav/gray_circle.svg';
import halfArrow from '../../assets/icons/nav/half_arrow.svg';

// AccountDetailLayout의 좌우 20px 패딩을 상쇄하고 24px로 재적용
const Body = styled.div`
  margin: 0 -20px;
  padding: 0 24px 40px;
`;

// 추천 제품 캐러셀 — 구분선과 42px 간격 (오늘의 추천 제품과 동일한 API 사용)
const Carousel = styled.div`
  display: flex;
  margin-top: 42px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Slide = styled.div`
  flex: 0 0 100%;
  aspect-ratio: 1 / 1;
  scroll-snap-align: start;
  background: #f6f4f2;
  overflow: hidden;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 캐러셀 인디케이터 — 캐러셀과 16px 간격, 현재 슬라이드만 긴 알약 모양
const DotsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 16px;
`;

const Dot = styled.img``;

// 완료 안내 문구 — 캐러셀 블록과 40px 간격
const MessageBlock = styled.div`
  margin-top: 40px;
`;

const CompleteTitle = styled.p`
  margin: 0;
  color: black;
  font-size: 24px;
  font-family: 'SD Minburi';
  font-weight: 500;
`;

// 부가 설명 — 완료 문구와 8px 간격
const CompleteDescription = styled.p`
  margin: 8px 0 0;
  color: black;
  font-size: 14px;
  font-family: 'SD Minburi';
  font-weight: 400;
  line-height: 1.6;
`;

// 구매 가능 매장 확인하기 — 완료 안내 블록과 76px 간격
const StoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 76px;
  padding: 0;
  border: none;
  background: none;
  color: black;
  font-size: 16px;
  font-family: 'SD Minburi';
  font-weight: 400;
  cursor: pointer;
`;

const StoreArrow = styled.img`
  width: 46.5px;
  height: 8px;
`;

// 구매 가능 매장 버튼과 16px 간격의 구분선
const Divider = styled.div`
  margin-top: 16px;
  border-bottom: 1px solid #e5e4e7;
`;

// 챕터 마지막 슬라이드에서 다음으로 넘어가면 도착하는 완료 화면
// 실제 완료 처리(api/storyProgress.completeChapter)는 StoryView에서 이 화면으로 넘어오기 직전에 호출됩니다.
function StoryChapterComplete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useRecommendedProducts();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const chapterIndex = chapters.findIndex((item) => item.id === Number(id));
  const chapter = chapters[chapterIndex];
  const isLastChapter = chapterIndex === chapters.length - 1;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateActive = () => {
      setActiveIndex(Math.round(el.scrollLeft / el.clientWidth));
    };

    el.addEventListener('scroll', updateActive, { passive: true });
    return () => el.removeEventListener('scroll', updateActive);
  }, [products.length]);

  return (
    <AccountDetailLayout>
      <Body>
        <Carousel ref={scrollRef}>
          {products.map((product) => (
            <Slide key={product.id}>
              {product.imageUrl ? (
                <SlideImage src={product.imageUrl} alt={product.name} />
              ) : null}
            </Slide>
          ))}
        </Carousel>

        {products.length > 1 ? (
          <DotsRow>
            {products.map((product, index) => (
              <Dot
                key={product.id}
                src={index === activeIndex ? longEllipse : grayCircle}
                alt=""
                aria-hidden
              />
            ))}
          </DotsRow>
        ) : null}

        <MessageBlock>
          <CompleteTitle>
            {isLastChapter
              ? '시즌 스토리가 완료되었습니다.'
              // : `${chapter?.label} ${chapter?.title}가 완료되었습니다.`}
              //  Chapter 1. Introduction가 완료되었습니다.
              : `Chapter ${chapter?.id}가 완료되었습니다.`}
          </CompleteTitle>
          <CompleteDescription>
            {isLastChapter
              ? '스토리를 함께한 비세토스 라이언을 실물 제품으로 만나보세요.'
              : '다음 챕터가 열렸어요. 이어서 스토리를 진행해보세요.'}
          </CompleteDescription>
        </MessageBlock>

        <StoreButton type="button" onClick={() => navigate('/story/stores')}>
          구매 가능 매장 확인하기
          <StoreArrow src={halfArrow} alt="" aria-hidden />
        </StoreButton>
        <Divider />
      </Body>
    </AccountDetailLayout>
  );
}

export default StoryChapterComplete;

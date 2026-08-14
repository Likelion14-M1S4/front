import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../../components/common/Card/ProductCard';
import { useRecommendedProducts } from '../../hooks/useRecommendedProducts';
import { SECTION_GAP_REM } from '../../styles/theme';

const CENTER_WIDTH = 11.5;
const CENTER_HEIGHT = 14.625;
const GAP = 0.75;

const Section = styled.section`
  padding: ${SECTION_GAP_REM}rem 0 1.5rem;
`;

const Carousel = styled.div`
  display: flex;
  align-items: center;
  height: ${CENTER_HEIGHT}rem;
  min-height: ${CENTER_HEIGHT}rem;
  gap: ${GAP}rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;
  padding: 0 calc((100% - ${CENTER_WIDTH}rem) / 2);
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// 슬롯 크기는 가운데 카드 기준으로 고정 → 크기 바뀌어도 아래 텍스트가 안 밀림
const Slide = styled.div`
  flex: 0 0 ${CENTER_WIDTH}rem;
  width: ${CENTER_WIDTH}rem;
  height: ${CENTER_HEIGHT}rem;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextBlock = styled.div`
  margin-top: 3rem;
  padding: 0 2rem;
  text-align: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: #000000;
`;

const ProductName = styled.h3`
  margin: 0.5rem 0 0;
  min-height: 3.25rem;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.3;
  color: #000000;
`;

const Description = styled.p`
  margin: 0.5rem 0 0;
  min-height: calc(0.875rem * 1.625 * 3);
  font-size: 0.875rem;
  line-height: 1.625;
  color: #000000;
`;

function getInitialIndex(list) {
  const marked = list.findIndex((item) => item.isInitial);
  if (marked >= 0) return marked;
  return Math.min(1, Math.max(0, list.length - 1));
}

function scrollToIndex(container, index) {
  const card = container.children[index];
  if (!(card instanceof HTMLElement)) return;

  const left = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
  container.scrollTo({ left, behavior: 'auto' });
}

// 홈 하단 추천 제품 캐러셀 (개수 가변, API: getRecommendedProducts)
function RecommendedProductSection() {
  const { products, isLoading } = useRecommendedProducts();
  const scrollRef = useRef(null);
  const didInitScroll = useRef(false);
  const initialIndex = useMemo(
    () => (products.length ? getInitialIndex(products) : 0),
    [products],
  );
  // null이면 아직 스크롤 전 → initialIndex 사용해 첫 프레임부터 위치 고정
  const [centerIndex, setCenterIndex] = useState(null);
  const activeIndex = centerIndex ?? initialIndex;

  useEffect(() => {
    didInitScroll.current = false;
    setCenterIndex(null);
  }, [products]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !products.length || didInitScroll.current) return;

    requestAnimationFrame(() => {
      scrollToIndex(el, initialIndex);
      setCenterIndex(initialIndex);
      didInitScroll.current = true;
    });
  }, [products, initialIndex]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateCenter = () => {
      const centerX = el.scrollLeft + el.clientWidth / 2;
      let nearest = 0;
      let nearestDist = Infinity;

      Array.from(el.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement)) return;
        const childCenter = child.offsetLeft + child.clientWidth / 2;
        const dist = Math.abs(childCenter - centerX);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = index;
        }
      });

      setCenterIndex(nearest);
    };

    el.addEventListener('scroll', updateCenter, { passive: true });
    el.addEventListener('scrollend', updateCenter);
    return () => {
      el.removeEventListener('scroll', updateCenter);
      el.removeEventListener('scrollend', updateCenter);
    };
  }, [products.length]);

  if (isLoading || products.length === 0) return null;

  const centeredProduct = products[activeIndex] ?? products[0];

  return (
    <Section>
      <Carousel ref={scrollRef}>
        {products.map((item, index) => (
          <Slide key={item.id}>
            <ProductCard
              imageUrl={item.imageUrl}
              name={item.name}
              detailUrl={item.detailUrl}
              featured={index === activeIndex}
            />
          </Slide>
        ))}
      </Carousel>

      <TextBlock>
        <Title>오늘의 추천 제품</Title>
        <ProductName>{centeredProduct.name}</ProductName>
        <Description>{centeredProduct.description}</Description>
      </TextBlock>
    </Section>
  );
}

export default RecommendedProductSection;

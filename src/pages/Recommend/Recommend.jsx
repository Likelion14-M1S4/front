import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useRecommendPage } from '../../hooks/useRecommendPage';
import { APP_MAX_WIDTH_REM } from '../../styles/theme';
import { getContrastTextColor } from '../../utils/getContrastTextColor';

const CONTENT_X = 1;

const Page = styled.div`
  width: 100%;
  max-width: ${APP_MAX_WIDTH_REM}rem;
  margin: 0 auto;
  padding: 0 0 1.5rem;
  box-sizing: border-box;
`;

const Hero = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 27.25rem;
  background: #f2f2f2;
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0 ${CONTENT_X}rem 1rem;
`;

const HeroOverlayTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: ${({ $color }) => $color};
`;

const HeroArrow = styled(HiOutlineArrowRight)`
  flex-shrink: 0;
  color: ${({ $color }) => $color};
`;

const SectionTitle = styled.h2`
  margin: 0;
  text-align: left;
  color: black;
  font-size: 1.5rem;
  font-family: 'Pretendard';
  font-weight: 500;
  line-height: 1.421875rem;
  word-wrap: break-word;
`;

const SectionDivider = styled.span`
  display: block;
  width: 8.75rem;
  height: 1px;
  margin: 0.8125rem 0 1rem;
  background-color: #000000;
`;

const Section = styled.section`
  padding-top: 6rem;
  text-align: left;
`;

const SectionHeader = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0 1.25rem;
  text-align: left;
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 16.8125rem;
  background: #f2f2f2;
  overflow: hidden;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BannerOverlay = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  padding: 0 ${CONTENT_X}rem 1.125rem;
  text-align: left;
`;

const OverlayTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: #000000;
`;

const ProductRail = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 0 ${CONTENT_X}rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProductLink = styled(Link)`
  display: block;
  width: 10rem;
  flex-shrink: 0;
`;

const ProductThumb = styled.div`
  width: 10rem;
  height: 11.25rem;
  background: #f2f2f2;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductName = styled.p`
  margin: 0.625rem 0 0;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Status = styled.p`
  margin: 2.5rem 1.25rem;
  text-align: center;
  font-size: 0.875rem;
  color: #8a7a6c;
`;

const HERO_TITLE = '마이스터라이언과 함께하는 여정';
const CURATION_TITLE = '이달의 큐레이션';

// 추천 페이지 — GET /api/recommend
function Recommend() {
  const { page, isLoading, error } = useRecommendPage();
  const [heroTextColor, setHeroTextColor] = useState('#000000');

  useEffect(() => {
    if (!page?.heroImageUrl) return undefined;

    let cancelled = false;
    getContrastTextColor(page.heroImageUrl, {
      displayWidth: 430,
      displayHeight: 436,
    }).then((color) => {
      if (!cancelled) setHeroTextColor(color);
    });

    return () => {
      cancelled = true;
    };
  }, [page?.heroImageUrl]);

  if (isLoading) {
    return (
      <Page>
        <Status>불러오는 중…</Status>
      </Page>
    );
  }

  if (error || !page) {
    return (
      <Page>
        <Status>추천 정보를 불러오지 못했습니다.</Status>
      </Page>
    );
  }

  const { heroImageUrl, heroLinkTo, curation, bestsellers } = page;
  const heroTo = heroLinkTo || '/recommend/charms';

  return (
    <Page>
      <Hero to={heroTo} aria-label={HERO_TITLE}>
        {heroImageUrl ? <HeroImage src={heroImageUrl} alt="" /> : null}
        <HeroOverlay>
          <HeroOverlayTitle $color={heroTextColor}>{HERO_TITLE}</HeroOverlayTitle>
          <HeroArrow size={24} $color={heroTextColor} />
        </HeroOverlay>
      </Hero>

      <Section>
        <SectionHeader>
          <SectionTitle>{CURATION_TITLE}</SectionTitle>
          <SectionDivider aria-hidden />
        </SectionHeader>
        <Banner>
          {curation.imageUrl ? (
            <BannerImage src={curation.imageUrl} alt={curation.title} />
          ) : null}
          <BannerOverlay>
            <OverlayTitle>{bestsellers.title}</OverlayTitle>
          </BannerOverlay>
        </Banner>
        <ProductRail>
          {bestsellers.products.map((product) => (
            <ProductLink key={product.id} to={`/product/${product.id}`}>
              <ProductThumb>
                {product.imageUrl ? (
                  <ProductImage src={product.imageUrl} alt={product.name} />
                ) : null}
              </ProductThumb>
              <ProductName>{product.name}</ProductName>
            </ProductLink>
          ))}
        </ProductRail>
      </Section>
    </Page>
  );
}

export default Recommend;

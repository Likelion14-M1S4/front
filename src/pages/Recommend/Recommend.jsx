import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecommendPage } from '../../hooks/useRecommendPage';
import { formatPrice } from '../../utils/formatPrice';
import { APP_MAX_WIDTH_REM } from '../../styles/theme';

const CONTENT_X = 1;

const Page = styled.div`
  width: 100%;
  max-width: ${APP_MAX_WIDTH_REM}rem;
  margin: 0 auto;
  padding: 0 0 1.5rem;
  box-sizing: border-box;
`;

const Hero = styled(Link)`
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

const HeroStatic = styled.div`
  width: 100%;
  height: 27.25rem;
  background: #f2f2f2;
  overflow: hidden;
`;

const HeroCaption = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 1.75rem ${CONTENT_X}rem 0;
  text-align: left;
`;

const HeroTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: #000000;
`;

const HeroSubtitle = styled.p`
  margin: 0.5rem 0 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #000000;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: #000000;
`;

const Section = styled.section`
  padding-top: ${({ $spaced }) => ($spaced ? '11.25rem' : '2.25rem')};
`;

const SectionHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 ${CONTENT_X}rem;
  text-align: left;
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 16.8125rem;
  margin-top: 0.5rem;
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

const ProductPrice = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.4;
  color: #000000;
`;

const Status = styled.p`
  margin: 2.5rem 1.25rem;
  text-align: center;
  font-size: 0.875rem;
  color: #8a7a6c;
`;

// 추천 페이지 — GET /api/recommend
function Recommend() {
  const { page, isLoading, error } = useRecommendPage();

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

  const { heroImageUrl, heroLinkTo, journey, curation, bestsellers } = page;

  return (
    <Page>
      {heroLinkTo ? (
        <Hero to={heroLinkTo} aria-label="참 추천 페이지로 이동">
          {heroImageUrl ? <HeroImage src={heroImageUrl} alt="" /> : null}
        </Hero>
      ) : (
        <HeroStatic>
          {heroImageUrl ? <HeroImage src={heroImageUrl} alt="" /> : null}
        </HeroStatic>
      )}
      <HeroCaption>
        <HeroTitle>{journey.title}</HeroTitle>
        {journey.subtitle ? (
          <HeroSubtitle>{journey.subtitle}</HeroSubtitle>
        ) : null}
      </HeroCaption>

      <Section $spaced>
        <SectionHeader>
          <SectionTitle>{curation.title}</SectionTitle>
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
              <ProductPrice>{formatPrice(product.price)}</ProductPrice>
            </ProductLink>
          ))}
        </ProductRail>
      </Section>
    </Page>
  );
}

export default Recommend;

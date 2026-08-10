import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecommendPage } from '../../hooks/useRecommendPage';
import { formatPrice } from '../../utils/formatPrice';
import { APP_WIDTH } from '../../styles/theme';

const CONTENT_X = 16;

const Page = styled.div`
  width: 100%;
  max-width: ${APP_WIDTH}px;
  margin: 0 auto;
  padding: 0 0 24px;
  box-sizing: border-box;
`;

const Hero = styled(Link)`
  display: block;
  width: 100%;
  height: 436px;
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
  height: 436px;
  background: #f2f2f2;
  overflow: hidden;
`;

const HeroCaption = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 28px ${CONTENT_X}px 0;
  text-align: left;
`;

const HeroTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  color: #000000;
`;

const HeroSubtitle = styled.p`
  margin: 8px 0 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #000000;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  color: #000000;
`;

const Section = styled.section`
  padding-top: ${({ $spaced }) => ($spaced ? '180px' : '36px')};
`;

const SectionHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 ${CONTENT_X}px;
  text-align: left;
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 269px;
  margin-top: 8px;
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
  padding: 0 ${CONTENT_X}px 18px;
  text-align: left;
`;

const OverlayTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  color: #000000;
`;

const ProductRail = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  padding: 0 ${CONTENT_X}px;
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
  width: 160px;
  flex-shrink: 0;
`;

const ProductThumb = styled.div`
  width: 160px;
  height: 180px;
  background: #f2f2f2;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductName = styled.p`
  margin: 10px 0 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductPrice = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  color: #000000;
`;

const Status = styled.p`
  margin: 40px 20px;
  text-align: center;
  font-size: 14px;
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

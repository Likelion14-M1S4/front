import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BackHeader from '../../components/common/Header/BackHeader';
import { useSeasonProducts } from '../../hooks/useSeasonProducts';
import { APP_MAX_WIDTH_REM } from '../../styles/theme';

const Page = styled.div`
  width: 100%;
  max-width: ${APP_MAX_WIDTH_REM}rem;
  margin: 0 auto;
  padding: 0 0 3rem;
  box-sizing: border-box;
  background: #ffffff;
`;

const Hero = styled.div`
  width: 100%;
  aspect-ratio: 392 / 259;
  background: #f2f2f2;
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Description = styled.p`
  margin: 1.5rem 1.25rem 0;
  white-space: pre-line;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.7;
  color: #000000;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 0.75rem;
  row-gap: 1.75rem;
  margin-top: 2rem;
`;

const Card = styled(Link)`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: inherit;
  text-decoration: none;
`;

const Thumb = styled.div`
  width: 100%;
  aspect-ratio: 189 / 200;
  background: #f2f2f2;
  overflow: hidden;
`;

const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductName = styled.p`
  margin: 0.75rem 0 0;
  overflow: hidden;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
  color: #000000;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const FooterBanner = styled.div`
  width: 100%;
  aspect-ratio: 391 / 262;
  margin: 2.5rem 0 0;
  background: #f2f2f2;
  overflow: hidden;
`;

const FooterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Status = styled.p`
  margin: 2.5rem 1.25rem;
  text-align: center;
  font-size: 0.875rem;
  color: #8a7a6c;
`;

// 시즌 제품 목록 — 홈 첫 배너에서 진입
function SeasonProducts() {
  const { page, isLoading, error } = useSeasonProducts();

  if (isLoading) {
    return (
      <Page>
        <BackHeader showDivider={false} />
        <Status>불러오는 중…</Status>
      </Page>
    );
  }

  if (error || !page) {
    return (
      <Page>
        <BackHeader showDivider={false} />
        <Status>시즌 제품을 불러오지 못했습니다.</Status>
      </Page>
    );
  }

  return (
    <Page>
      <BackHeader showDivider={false} />

      <Hero>
        {page.heroImageUrl ? (
          <HeroImage src={page.heroImageUrl} alt="시즌 제품" />
        ) : null}
      </Hero>

      {page.description ? <Description>{page.description}</Description> : null}

      <Grid>
        {page.products.map((product) => (
          <Card key={product.id} to={`/season/${product.id}`}>
            <Thumb>
              {product.imageUrl ? (
                <ThumbImage src={product.imageUrl} alt={product.name} />
              ) : null}
            </Thumb>
            <ProductName>{product.name}</ProductName>
          </Card>
        ))}
      </Grid>

      <FooterBanner>
        {page.footerImageUrl ? (
          <FooterImage src={page.footerImageUrl} alt="" />
        ) : null}
      </FooterBanner>
    </Page>
  );
}

export default SeasonProducts;

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BackHeader from '../../components/common/Header/BackHeader';
import { useSeasonProducts } from '../../hooks/useSeasonProducts';
import { APP_WIDTH } from '../../styles/theme';

const Page = styled.div`
  width: 100%;
  max-width: ${APP_WIDTH}px;
  margin: 0 auto;
  padding: 0 0 48px;
  box-sizing: border-box;
  background: #ffffff;
`;

const Hero = styled.div`
  width: 392px;
  max-width: 100%;
  height: 259px;
  margin: 0 auto;
  background: #f2f2f2;
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Description = styled.p`
  margin: 24px 20px 0;
  white-space: pre-line;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.7;
  color: #000000;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 189px 189px;
  justify-content: center;
  column-gap: 12px;
  row-gap: 28px;
  margin-top: 32px;
`;

const Card = styled(Link)`
  display: flex;
  width: 189px;
  flex-direction: column;
  color: inherit;
  text-decoration: none;
`;

const Thumb = styled.div`
  width: 189px;
  height: 200px;
  background: #f2f2f2;
  overflow: hidden;
`;

const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductName = styled.p`
  margin: 12px 0 0;
  overflow: hidden;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  color: #000000;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const FooterBanner = styled.div`
  width: 391px;
  max-width: 100%;
  height: 262px;
  margin: 40px auto 0;
  background: #f2f2f2;
  overflow: hidden;
`;

const FooterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Status = styled.p`
  margin: 40px 20px;
  text-align: center;
  font-size: 14px;
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

import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import BackHeader from '../../components/common/Header/BackHeader';
import Button from '../../components/common/Button/Button';
import { useSeasonProductDetail } from '../../hooks/useSeasonProductDetail';
import line2Icon from '../../assets/icons/recommend/line2.svg';
import vector2Icon from '../../assets/icons/recommend/Vector2.svg';
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
  aspect-ratio: 1 / 1;
  background: #f2f2f2;
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 1.5rem 1.25rem 0;
`;

const ProductName = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: #000000;
`;

const StoreRow = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.25rem;
  padding: 0 0 0.875rem;
  border-bottom: 1px solid #ededed;
  font-size: 1rem;
  font-weight: 400;
  color: #000000;
  text-decoration: none;
`;

const StoreArrow = styled.img`
  width: 3.0625rem;
  height: 0.5625rem;
`;

const CtaWrap = styled.div`
  margin-top: 1.75rem;
`;

const DetailBlock = styled.div`
  margin-top: 1.75rem;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
`;

const DetailToggle = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1.125rem 0;
  font-size: 1rem;
  font-weight: 400;
  color: #000000;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
`;

const DetailChevron = styled.img`
  width: 0.5rem;
  height: 0.875rem;
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? 'rotate(-90deg)' : 'rotate(0deg)')};
`;

const DetailBody = styled.div`
  padding: 0 0 1.5rem;
  border-top: 1px solid #ededed;
`;

const DetailHeadline = styled.p`
  margin: 1.25rem 0 0;
  font-size: 0.9375rem;
  font-weight: 700;
  line-height: 1.6;
  color: #000000;
`;

const DetailDescription = styled.p`
  margin: 1rem 0 0;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.7;
  color: #000000;
`;

const SpecList = styled.ul`
  margin: 1rem 0 0;
  padding: 0 0 0 1.125rem;
  list-style: disc;
`;

const SpecItem = styled.li`
  margin: 0 0 0.375rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #000000;
`;

const Status = styled.p`
  margin: 2.5rem 1.25rem;
  text-align: center;
  font-size: 0.875rem;
  color: #8a7a6c;
`;

// 시즌 한정 참 상세 — 스토리 진행 여부에 따라 CTA 분기
function SeasonProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { product, storyProgressed, isLoading, error } =
    useSeasonProductDetail(productId);
  const [detailOpen, setDetailOpen] = useState(false);

  if (isLoading) {
    return (
      <Page>
        <BackHeader showDivider={false} />
        <Status>불러오는 중…</Status>
      </Page>
    );
  }

  if (error || !product) {
    return (
      <Page>
        <BackHeader showDivider={false} />
        <Status>제품 정보를 불러오지 못했습니다.</Status>
      </Page>
    );
  }

  // 구매하지 않았고 스토리 미진행이면 잠금 CTA
  const canPurchase =
    product.isPurchased || !product.requiresStory || storyProgressed;

  const handlePurchaseClick = () => {
    if (canPurchase) {
      navigate(product.storeUrl || '/story/stores');
      return;
    }
    navigate('/story/chapter');
  };

  return (
    <Page>
      <BackHeader showDivider={false} />

      <Hero>
        {product.imageUrl ? (
          <HeroImage src={product.imageUrl} alt={product.name} />
        ) : null}
      </Hero>

      <Info>
        <ProductName>{product.name}</ProductName>

        <StoreRow to={product.storeUrl || '/story/stores'}>
          <span>{product.storeCheckLabel}</span>
          <StoreArrow src={line2Icon} alt="" />
        </StoreRow>

        <CtaWrap>
          <Button
            fullWidth
            variant={canPurchase ? 'primary' : 'outline'}
            onClick={handlePurchaseClick}
          >
            {canPurchase ? '구매 가능' : '스토리 진행 후 구매 가능'}
          </Button>
        </CtaWrap>

        <DetailBlock>
          <DetailToggle
            type="button"
            aria-expanded={detailOpen}
            onClick={() => setDetailOpen((prev) => !prev)}
          >
            <span>제품 상세정보</span>
            <DetailChevron src={vector2Icon} alt="" $open={detailOpen} />
          </DetailToggle>
          {detailOpen ? (
            <DetailBody>
              {product.detail.headline ? (
                <DetailHeadline>{product.detail.headline}</DetailHeadline>
              ) : null}
              {product.detail.description ? (
                <DetailDescription>
                  {product.detail.description}
                </DetailDescription>
              ) : null}
              {product.detail.specs.length > 0 ? (
                <SpecList>
                  {product.detail.specs.map((spec) => (
                    <SpecItem key={spec}>{spec}</SpecItem>
                  ))}
                </SpecList>
              ) : null}
            </DetailBody>
          ) : null}
        </DetailBlock>
      </Info>
    </Page>
  );
}

export default SeasonProductDetail;

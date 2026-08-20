import { useNavigate, useParams, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import BackHeader from '../../components/common/Header/BackHeader';
import { useSeasonProductDetail } from '../../hooks/useSeasonProductDetail';
import line2Icon from '../../assets/icons/recommend/line2.svg';
import { APP_MAX_WIDTH_REM } from '../../styles/theme';

const Page = styled.div`
  width: 100%;
  max-width: ${APP_MAX_WIDTH_REM}rem;
  margin: 0 auto;
  padding: 0 0 3rem;
  box-sizing: border-box;
  background: #ffffff;
`;

const Title = styled.h1`
  margin: 1rem 1.25rem 1rem;
  padding: 0 0 1rem;
  color: black;
  font-size: 1.75rem;
  font-family: 'Pretendard';
  font-weight: 500;
  border-bottom: 1.5px solid #000000;
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

const ProductName = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: #000000;
`;

const ColorLabel = styled.p`
  margin: 4.25rem 0 0;
  font-size: 1rem;
  font-weight: 400;
  color: #000000;
`;

const StoreRow = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  font-size: 1rem;
  font-weight: 400;
  color: #000000;
  text-decoration: none;
`;

const StoreArrow = styled.img`
  width: 3.0625rem;
  height: 0.5625rem;
`;

const Divider = styled.div`
  margin-top: 0.9375rem;
  height: 1px;
  background: #ededed;
`;

const CtaWrap = styled.div`
  margin-top: 4.5rem;
`;

// 이 페이지 전용 구매 버튼 — 공통 Button과 별개로 여기서만 디자인 조정
const purchaseButtonVariants = {
  primary: css`
    background: #1a1a1a;
    color: #ffffff;
  `,
  outline: css`
    border: 1px solid #1a1a1a;
    color: #1a1a1a;
    background: transparent;
  `,
};

const PurchaseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 5px;
  padding: 0.75rem 1.25rem;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  transition: opacity 0.15s;

  ${({ $variant }) => purchaseButtonVariants[$variant] || purchaseButtonVariants.primary}

  &:active {
    opacity: 0.7;
  }
`;

const Status = styled.p`
  margin: 2.5rem 1.25rem;
  text-align: center;
  font-size: 0.875rem;
  color: #8a7a6c;
`;

function isExternalUrl(url) {
  return /^https?:\/\//i.test(url);
}

function openPurchaseUrl(url) {
  if (!url) return false;
  if (isExternalUrl(url)) {
    window.open(url, '_blank', 'noopener,noreferrer');
    return true;
  }
  return false;
}

// 시즌 한정 참 상세 — 스토리 진행 여부에 따라 CTA 분기
function SeasonProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { product, storyProgressed, isLoading, error } =
    useSeasonProductDetail(productId);

  if (isLoading) {
    return (
      <Page>
        <BackHeader showDivider={false} />
        <Title>시즌 한정 참</Title>
        <Status>불러오는 중…</Status>
      </Page>
    );
  }

  if (error || !product) {
    return (
      <Page>
        <BackHeader showDivider={false} />
        <Title>시즌 한정 참</Title>
        <Status>제품 정보를 불러오지 못했습니다.</Status>
      </Page>
    );
  }

  // 구매하지 않았고 스토리 미진행이면 잠금 CTA
  const canPurchase =
    product.isPurchased || !product.requiresStory || storyProgressed;

  const handlePurchaseClick = () => {
    if (!canPurchase) {
      navigate('/story/chapter');
      return;
    }

    // 홈 추천 백팩과 같이 실제 구매 URL로 이동
    if (openPurchaseUrl(product.purchaseUrl)) return;
    navigate(product.purchaseUrl || product.storeUrl || '/story/stores');
  };

  return (
    <Page>
      <BackHeader showDivider={false} />
      <Title>시즌 한정 참</Title>

      <Hero>
        {product.imageUrl ? (
          <HeroImage src={product.imageUrl} alt={product.name} />
        ) : null}
      </Hero>

      <Info>
        <ProductName>{product.name}</ProductName>

        {product.colorLabel ? (
          <ColorLabel>색상: {product.colorLabel}</ColorLabel>
        ) : null}

        <StoreRow to={product.storeUrl || '/story/stores'}>
          <span>{product.storeCheckLabel}</span>
          <StoreArrow src={line2Icon} alt="" />
        </StoreRow>

        <Divider />

        <CtaWrap>
          <PurchaseButton
            type="button"
            $variant={canPurchase ? 'primary' : 'outline'}
            onClick={handlePurchaseClick}
          >
            {canPurchase ? '구매 가능' : '스토리 진행 후 구매 가능'}
          </PurchaseButton>
        </CtaWrap>
      </Info>
    </Page>
  );
}

export default SeasonProductDetail;

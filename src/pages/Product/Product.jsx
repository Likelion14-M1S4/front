import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BackHeader from '../../components/common/Header/BackHeader';
import { useProductDetail } from '../../hooks/useProductDetail';
import { removeWishlistItem } from '../../api/wishlist';
import hartIcon from '../../assets/icons/recommend/hart.svg';
import hart2Icon from '../../assets/icons/recommend/hart2.svg';
import line2Icon from '../../assets/icons/recommend/line2.svg';
import vector2Icon from '../../assets/icons/recommend/Vector2.svg';
import vector3Icon from '../../assets/icons/recommend/Vector3.svg';

const Page = styled.div`
  padding: 0 0 3rem;
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
  padding: 1.25rem 1.25rem 0;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const ProductName = styled.h1`
  margin: 0;
  flex: 1;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: #000000;
`;

const LikeButton = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
`;

const LikeIcon = styled.img`
  width: 1.1875rem;
  height: 1.125rem;
`;

const SizeBlock = styled.div`
  margin-top: 1.75rem;
`;

const SizeToggle = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0;
  font-size: 1rem;
  font-weight: 400;
  color: #000000;
  text-align: left;
`;

const SizeChevron = styled.img`
  width: 0.5rem;
  height: 0.6875rem;
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? 'rotate(-90deg)' : 'rotate(0deg)')};
`;

const SizeMenu = styled.div`
  margin-top: 0.75rem;
  padding: 1rem 1.125rem;
  background: #fbfbfb;
`;

const SizeOption = styled.button`
  display: block;
  width: 100%;
  padding: 0.625rem 0;
  font-size: 1rem;
  font-weight: 400;
  color: #000000;
  text-align: left;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const StoreRow = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.75rem;
  padding: 0.25rem 0;
  font-size: 1rem;
  font-weight: 400;
  color: #000000;
`;

const StoreArrow = styled.img`
  width: 3.0625rem;
  height: 0.5625rem;
`;

const DetailBlock = styled.div`
  margin-top: 1.75rem;
  border-top: 1px solid #e8e2dc;
  border-bottom: 1px solid #e8e2dc;
`;

const DetailToggle = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1.125rem 0;
  font-size: 1.25rem;
  font-weight: 400;
  color: #000000;
  text-align: left;
  border-bottom: ${({ $open }) => ($open ? '1px solid #e8e2dc' : 'none')};
`;

const DetailChevron = styled.img`
  width: 0.5rem;
  height: 0.875rem;
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? 'rotate(-90deg)' : 'rotate(0deg)')};
`;

const DetailBody = styled.div`
  padding: 1.25rem 0 1.5rem;
`;

const DetailHeadline = styled.p`
  margin: 0;
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

/** POST /api/wishlist — 백엔드 연동 시 api.post('/wishlist', { productId: item.id }) */
async function addWishlistItem(item) {
  return Promise.resolve(item?.id);
}

// 제품 상세 페이지 — GET /api/products/:productId
function Product() {
  const { productId } = useParams();
  const { product, isLoading, error } = useProductDetail(productId);

  const [liked, setLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeOpen, setSizeOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    if (!product) return;
    setLiked(product.isLiked);
    setSelectedSize(product.selectedSize || product.sizes[0] || '');
    setSizeOpen(false);
    setDetailOpen(false);
  }, [product]);

  const handleLikeClick = async () => {
    if (!product) return;

    const nextLiked = !liked;
    setLiked(nextLiked);

    try {
      if (nextLiked) {
        await addWishlistItem({
          id: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
        });
      } else {
        await removeWishlistItem(product.id);
      }
    } catch {
      setLiked(!nextLiked);
    }
  };

  if (isLoading) {
    return (
      <Page>
        <Status>불러오는 중…</Status>
      </Page>
    );
  }

  if (error || !product) {
    return (
      <Page>
        <BackHeader />
        <Status>제품 정보를 불러오지 못했습니다.</Status>
      </Page>
    );
  }

  return (
    <Page>
      <BackHeader />

      <Hero>
        {product.imageUrl ? (
          <HeroImage src={product.imageUrl} alt={product.name} />
        ) : null}
      </Hero>

      <Info>
        <TitleRow>
          <ProductName>{product.name}</ProductName>
          <LikeButton
            type="button"
            aria-label={liked ? '위시리스트에서 삭제' : '위시리스트에 추가'}
            aria-pressed={liked}
            onClick={handleLikeClick}
          >
            <LikeIcon src={liked ? hart2Icon : hartIcon} alt="" />
          </LikeButton>
        </TitleRow>

        <SizeBlock>
          <SizeToggle
            type="button"
            aria-expanded={sizeOpen}
            onClick={() => setSizeOpen((prev) => !prev)}
          >
            <span>사이즈 : {selectedSize}</span>
            <SizeChevron src={vector3Icon} alt="" $open={sizeOpen} />
          </SizeToggle>
          {sizeOpen ? (
            <SizeMenu>
              {product.sizes.map((size) => (
                <SizeOption
                  key={size}
                  type="button"
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeOpen(false);
                  }}
                >
                  {size}
                </SizeOption>
              ))}
            </SizeMenu>
          ) : null}
        </SizeBlock>

        <StoreRow
          href={product.storeUrl || '#'}
          target={product.storeUrl ? '_blank' : undefined}
          rel={product.storeUrl ? 'noopener noreferrer' : undefined}
          onClick={(event) => {
            if (!product.storeUrl) event.preventDefault();
          }}
        >
          <span>{product.storeCheckLabel}</span>
          <StoreArrow src={line2Icon} alt="" />
        </StoreRow>

        <DetailBlock>
          <DetailToggle
            type="button"
            aria-expanded={detailOpen}
            $open={detailOpen}
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
                <DetailDescription>{product.detail.description}</DetailDescription>
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

export default Product;

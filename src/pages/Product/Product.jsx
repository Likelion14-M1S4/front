import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BackHeader from '../../components/common/Header/BackHeader';
import { useProductDetail } from '../../hooks/useProductDetail';
import { formatPrice } from '../../utils/formatPrice';
import hartIcon from '../../assets/icons/recommend/hart.svg';
import hart2Icon from '../../assets/icons/recommend/hart2.svg';
import line2Icon from '../../assets/icons/recommend/line2.svg';
import vector2Icon from '../../assets/icons/recommend/Vector2.svg';
import vector3Icon from '../../assets/icons/recommend/Vector3.svg';

const Page = styled.div`
  padding: 0 0 48px;
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
  padding: 20px 20px 0;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const ProductName = styled.h1`
  margin: 0;
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  color: #000000;
`;

const LikeButton = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
`;

const LikeIcon = styled.img`
  width: 19px;
  height: 18px;
`;

const Price = styled.p`
  margin: 10px 0 0;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  color: #000000;
`;

const ColorBlock = styled.div`
  margin-top: 28px;
`;

const ColorLabel = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
`;

const ColorList = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
`;

const ColorSwatch = styled.button`
  width: 48px;
  height: 48px;
  overflow: hidden;
  background: #f2f2f2;
  outline: ${({ $active }) => ($active ? '1px solid #000000' : 'none')};
  outline-offset: 2px;
`;

const ColorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SizeBlock = styled.div`
  margin-top: 28px;
`;

const SizeToggle = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  text-align: left;
`;

const SizeChevron = styled.img`
  width: 8px;
  height: 11px;
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? 'rotate(-90deg)' : 'rotate(0deg)')};
`;

const SizeMenu = styled.div`
  margin-top: 12px;
  padding: 16px 18px;
  background: #fbfbfb;
`;

const SizeOption = styled.button`
  display: block;
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
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
  margin-top: 28px;
  padding: 4px 0;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
`;

const StoreArrow = styled.img`
  width: 49px;
  height: 9px;
`;

const DetailBlock = styled.div`
  margin-top: 28px;
  border-top: 1px solid #e8e2dc;
  border-bottom: 1px solid #e8e2dc;
`;

const DetailToggle = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
  font-size: 20px;
  font-weight: 400;
  color: #000000;
  text-align: left;
  border-bottom: ${({ $open }) => ($open ? '1px solid #e8e2dc' : 'none')};
`;

const DetailChevron = styled.img`
  width: 8px;
  height: 14px;
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? 'rotate(-90deg)' : 'rotate(0deg)')};
`;

const DetailBody = styled.div`
  padding: 20px 0 24px;
`;

const DetailHeadline = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.6;
  color: #000000;
`;

const DetailDescription = styled.p`
  margin: 16px 0 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.7;
  color: #000000;
`;

const SpecList = styled.ul`
  margin: 16px 0 0;
  padding: 0 0 0 18px;
  list-style: disc;
`;

const SpecItem = styled.li`
  margin: 0 0 6px;
  font-size: 14px;
  line-height: 1.6;
  color: #000000;
`;

const Status = styled.p`
  margin: 40px 20px;
  text-align: center;
  font-size: 14px;
  color: #8a7a6c;
`;

// 제품 상세 페이지 — GET /api/products/:productId
function Product() {
  const { productId } = useParams();
  const { product, isLoading, error } = useProductDetail(productId);

  const [liked, setLiked] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeOpen, setSizeOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    if (!product) return;
    setLiked(product.isLiked);
    setSelectedColorId(product.colors[0]?.id ?? '');
    setSelectedSize(product.selectedSize || product.sizes[0] || '');
    setSizeOpen(false);
    setDetailOpen(false);
  }, [product]);

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

  const activeColor =
    product.colors.find((color) => color.id === selectedColorId) ??
    product.colors[0];
  const displayImage = activeColor?.imageUrl || product.imageUrl;
  const colorName = activeColor?.name || product.colorLabel;

  return (
    <Page>
      <BackHeader />

      <Hero>
        {displayImage ? <HeroImage src={displayImage} alt={product.name} /> : null}
      </Hero>

      <Info>
        <TitleRow>
          <ProductName>{product.name}</ProductName>
          <LikeButton
            type="button"
            aria-label={liked ? '좋아요 취소' : '좋아요'}
            aria-pressed={liked}
            onClick={() => setLiked((prev) => !prev)}
          >
            <LikeIcon src={liked ? hart2Icon : hartIcon} alt="" />
          </LikeButton>
        </TitleRow>

        <Price>{formatPrice(product.price)}</Price>

        <ColorBlock>
          <ColorLabel>색상: {colorName}</ColorLabel>
          <ColorList>
            {product.colors.map((color) => (
              <ColorSwatch
                key={color.id}
                type="button"
                aria-label={color.name}
                $active={color.id === selectedColorId}
                onClick={() => setSelectedColorId(color.id)}
              >
                {color.imageUrl ? (
                  <ColorImage src={color.imageUrl} alt={color.name} />
                ) : null}
              </ColorSwatch>
            ))}
          </ColorList>
        </ColorBlock>

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

import styled from 'styled-components';

const CardShell = styled.div`
  display: block;
  width: ${({ $featured }) => ($featured ? '184px' : '161px')};
  height: ${({ $featured }) => ($featured ? '234px' : '205px')};
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 10px;
  background: #f2f2f2;
  transition:
    width 0.25s ease,
    height 0.25s ease;
`;

const CardLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
`;

const CoverImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

// 상품 이미지 카드 (추천 제품 캐러셀)
// featured: 가운데 184×234 / 양옆 161×205
// detailUrl이 있으면 외부 사이트로 이동
function ProductCard({ imageUrl, name, featured = false, detailUrl }) {
  const content = imageUrl ? <CoverImage src={imageUrl} alt={name} /> : null;

  if (detailUrl) {
    return (
      <CardShell $featured={featured}>
        <CardLink href={detailUrl} target="_blank" rel="noopener noreferrer">
          {content}
        </CardLink>
      </CardShell>
    );
  }

  return <CardShell $featured={featured}>{content}</CardShell>;
}

export default ProductCard;

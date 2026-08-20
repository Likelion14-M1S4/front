import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { getContrastTextColor } from '../../../utils/getContrastTextColor';

const CardLink = styled(Link)`
  position: relative;
  display: block;
  width: 19.25rem;
  height: 14.625rem;
  min-height: 14.625rem;
  max-height: 14.625rem;
  overflow: hidden;
  border-radius: 10px;
  background: #f2f2f2;
  flex-shrink: 0;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 14.625rem;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0 1rem 1rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ $color }) => $color};
`;

const Arrow = styled(HiOutlineArrowRight)`
  flex-shrink: 0;
  color: ${({ $color }) => $color};
`;

// 이미지 위에 제목이 얹히는 카드 (홈 화면의 시즌 배너에서 사용)
function ImageCard({ imageUrl, title, linkTo, showArrow = false }) {
  const [textColor, setTextColor] = useState('#000000');

  useEffect(() => {
    let cancelled = false;

    getContrastTextColor(imageUrl, { displayWidth: 308, displayHeight: 234 }).then(
      (color) => {
        if (!cancelled) setTextColor(color);
      },
    );

    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  return (
    <CardLink to={linkTo}>
      {imageUrl ? <CoverImage src={imageUrl} alt={title} /> : null}
      <Overlay>
        <Title $color={textColor}>{title}</Title>
        {showArrow && <Arrow size={24} $color={textColor} />}
      </Overlay>
    </CardLink>
  );
}

export default ImageCard;

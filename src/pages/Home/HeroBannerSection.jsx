import styled from 'styled-components';
import ImageCard from '../../components/common/Card/ImageCard';
import { homeBanner } from '../../mock/homeBanner';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
`;

const Description = styled.p`
  margin: 1rem 0 0;
  width: 19.25rem;
  white-space: pre-line;
  text-align: left;
  font-size: 0.875rem;
  line-height: 1.625;
  color: #000000;
  box-sizing: border-box;
`;

// 홈 상단 시즌 배너 섹션
function HeroBannerSection() {
  return (
    <Section>
      <ImageCard
        imageUrl={homeBanner.imageUrl}
        title={homeBanner.title}
        linkTo={homeBanner.linkTo}
        showArrow
      />
      <Description>{homeBanner.description}</Description>
    </Section>
  );
}

export default HeroBannerSection;

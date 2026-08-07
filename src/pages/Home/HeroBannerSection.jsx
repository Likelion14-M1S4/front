import ImageCard from '../../components/common/Card/ImageCard';
import { homeBanner } from '../../mock/homeBanner';

// 홈 상단 시즌 배너 섹션
function HeroBannerSection() {
  return (
    <section className="flex justify-center pt-5">
      <ImageCard
        imageUrl={homeBanner.imageUrl}
        title={homeBanner.title}
        description={homeBanner.description}
        linkTo={homeBanner.linkTo}
        showArrow
      />
    </section>
  );
}

export default HeroBannerSection;

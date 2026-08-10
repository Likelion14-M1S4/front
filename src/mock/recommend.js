import bannerImage from '../assets/images/image1.svg';
import storyImage from '../assets/images/image2.svg';
import productImage from '../assets/images/image3.svg';

// =============================================================================
// 더미 데이터 — GET /api/recommend 응답과 동일 스키마 유지
// =============================================================================

export const recommendPage = {
  heroImageUrl: bannerImage,
  heroLinkTo: '/recommend/charms',
  journey: {
    title: 'Selected for Your Journey',
    subtitle: '당신의 여정을 더욱 특별하게 만들어 줄 참을 만나보세요.',
  },
  curation: {
    title: '고객님을 위한 큐레이션',
    imageUrl: productImage,
  },
  bestsellers: {
    title: '핸드백 베스트셀러',
    products: [
      {
        id: 'stark-side-stud-visetos-backpack',
        name: 'Stark 사이드 스터드 비세토스 백팩',
        price: 1490000,
        imageUrl: productImage,
      },
      {
        id: 'aren-visetos-hobo',
        name: 'Aren 비세토스 호보',
        price: 1290000,
        imageUrl: storyImage,
      },
      {
        id: 'mcm-essential-tote',
        name: 'MCM 에센셜 토트',
        price: 2290000,
        imageUrl: bannerImage,
      },
    ],
  },
};

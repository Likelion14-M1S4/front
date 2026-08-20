import charmImage from '../assets/icons/nav/recommend/recommend-charm.svg';
import handbagImage from '../assets/icons/nav/recommend/recommend-handbag.svg';

// =============================================================================
// 더미 데이터 — GET /api/recommend 응답과 동일 스키마 유지
// =============================================================================

export const recommendPage = {
  heroImageUrl: charmImage,
  heroLinkTo: '/recommend/charms',
  journey: {
    title: 'Selected for Your Journey',
    subtitle: '당신의 여정을 더욱 특별하게 만들어 줄 참을 만나보세요.',
  },
  curation: {
    title: '고객님을 위한 큐레이션',
    imageUrl: handbagImage,
  },
  bestsellers: {
    title: '핸드백 베스트셀러',
    products: [
      {
        id: '1',
        name: 'Stark 사이드 스터드 비세토스 백팩',
        price: 1490000,
        imageUrl: handbagImage,
      },
      {
        id: '2',
        name: 'Aren 비세토스 호보',
        price: 1290000,
        imageUrl: handbagImage,
      },
      {
        id: '3',
        name: 'MCM 에센셜 토트',
        price: 2290000,
        imageUrl: handbagImage,
      },
    ],
  },
};

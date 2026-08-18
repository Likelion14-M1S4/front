import bannerImage from '../assets/images/image1.svg';
import storyImage from '../assets/images/image2.svg';
import productImage from '../assets/images/image3.svg';
import seasonCharmImage from '../assets/icons/nav/recommend/recommend-season_charm.svg';

// =============================================================================
// 더미 데이터 — GET /api/recommend/charms 응답과 동일 스키마 유지
// =============================================================================

export const charmRecommendPage = {
  featured: {
    id: 'visetos-lion',
    name: '비세토스 라이언',
    collectionName: 'MCM BASIC COLLECTION',
    description:
      'MCM의 상징성을 담아낸 라이언 참은 시그니처 비세토스 패턴과 정교한 가죽 디테일을 조화롭게 담아낸 아이코닉 액세서리입니다.',
    imageUrl: productImage,
    ctaLabel: '스토리 진행하고 추천 참 구매하기',
    ctaTo: '/story/chapter',
  },
  season: {
    title: '시즌의 참 장식',
    imageUrl: seasonCharmImage,
  },
  charms: [
    {
      id: 'charm-visetos-lion-1',
      name: '비세토스 라이언',
      collectionName: 'MCM BASIC COLLECTION',
      imageUrl: productImage,
      productId: '1',
    },
    {
      id: 'charm-visetos-lion-2',
      name: '비세토스 라이언',
      collectionName: 'MCM BASIC COLLECTION',
      imageUrl: storyImage,
      productId: '2',
    },
    {
      id: 'charm-visetos-lion-3',
      name: '비세토스 라이언',
      collectionName: 'MCM BASIC COLLECTION',
      imageUrl: bannerImage,
      productId: '3',
    },
    {
      id: 'charm-visetos-lion-4',
      name: '비세토스 라이언',
      collectionName: 'MCM BASIC COLLECTION',
      imageUrl: productImage,
      productId: '1',
    },
  ],
};

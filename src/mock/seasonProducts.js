import bannerImage from '../assets/images/image1.svg';
import storyImage from '../assets/images/image2.svg';
import productImage from '../assets/images/image3.svg';
import seasonHeroImage from '../assets/images/image_2.svg';

// =============================================================================
// 더미 데이터 — GET /api/season/products, GET /api/season/products/:id 응답과 동일 스키마 유지
// =============================================================================

export const seasonProductsPage = {
  heroImageUrl: seasonHeroImage,
  description:
    '회고적이면서도 미래지향적인 2026 가을-겨울 컬렉션은 뮌헨의 문화와 음악을 통해 MCM 50주년을 기념하며, 최첨단 소재와 미래지향적인 스타일을 조화롭게 담아냈습니다. 스터드 디테일의 실루엣과 혁신적인 가죽 제품은 예술과 기술, 여행이 교차하는 하우스의 정체성을 드러냅니다.',
  products: [
    {
      id: 'visetos-lion-charm',
      name: 'MCM 비세토스 라이언 참',
      price: 410000,
      imageUrl: productImage,
    },
    {
      id: 'stark-side-stud-charm',
      name: 'Stark 사이드 스터드 참',
      price: 1490000,
      imageUrl: storyImage,
    },
    {
      id: 'aren-visetos-charm',
      name: 'Aren 비세토스 참',
      price: 1140000,
      imageUrl: bannerImage,
    },
    {
      id: 'essential-lion-charm',
      name: 'MCM 에센셜 라이언 참',
      price: 390000,
      imageUrl: productImage,
    },
    {
      id: 'soft-berlin-charm',
      name: '소프트 베를린 참',
      price: 520000,
      imageUrl: storyImage,
    },
    {
      id: 'classic-visetos-charm',
      name: '클래식 비세토스 참',
      price: 450000,
      imageUrl: bannerImage,
    },
  ],
};

const sharedStore = {
  storeCheckLabel: '구매 가능 매장 확인하기',
  storeUrl: '/story/stores',
  purchaseUrl: 'https://www.mcmworldwide.com/en-kr/accessories/',
};

const seasonProductDetailsById = {
  'visetos-lion-charm': {
    id: 'visetos-lion-charm',
    name: 'MCM 비세토스 라이언 참',
    price: 410000,
    imageUrl: productImage,
    colorLabel: '꼬냑',
    isPurchased: false,
    requiresStory: true,
    ...sharedStore,
    detail: {
      headline: '시그니처 비세토스 패턴과 정교한 가죽 디테일의 라이언 참',
      description:
        'MCM의 상징성을 담아낸 시즌 한정 라이언 참입니다. 스토리를 진행한 고객에게만 구매가 개방됩니다.',
      specs: [
        '시즌 한정 참',
        '비세토스 모노그램 디테일',
        '가죽 스트랩 포함',
        '제조국: 대한민국',
      ],
    },
  },
  'stark-side-stud-charm': {
    id: 'stark-side-stud-charm',
    name: 'Stark 사이드 스터드 참',
    price: 1490000,
    imageUrl: storyImage,
    colorLabel: '블랙',
    isPurchased: false,
    requiresStory: true,
    ...sharedStore,
    detail: {
      headline: '피라미드 스터드 모티프를 담은 시즌 한정 참',
      description: '스타크 라인의 아이코닉한 스터드 디테일을 참에 담았습니다.',
      specs: ['시즌 한정 참', '스터드 메탈 디테일', '제조국: 대한민국'],
    },
  },
  'aren-visetos-charm': {
    id: 'aren-visetos-charm',
    name: 'Aren 비세토스 참',
    price: 1140000,
    imageUrl: bannerImage,
    colorLabel: '꼬냑',
    isPurchased: false,
    requiresStory: true,
    ...sharedStore,
    detail: {
      headline: '아렌 실루엣에서 영감받은 비세토스 참',
      description: '부드러운 곡선과 비세토스 패턴이 조화를 이룹니다.',
      specs: ['시즌 한정 참', '비세토스 모노그램', '제조국: 대한민국'],
    },
  },
  'essential-lion-charm': {
    id: 'essential-lion-charm',
    name: 'MCM 에센셜 라이언 참',
    price: 390000,
    imageUrl: productImage,
    colorLabel: '비세토스',
    isPurchased: true,
    requiresStory: true,
    ...sharedStore,
    detail: {
      headline: '데일리로 착용하기 좋은 에센셜 라이언 참',
      description: '이미 구매한 시즌 참입니다.',
      specs: ['시즌 한정 참', '제조국: 대한민국'],
    },
  },
  'soft-berlin-charm': {
    id: 'soft-berlin-charm',
    name: '소프트 베를린 참',
    price: 520000,
    imageUrl: storyImage,
    colorLabel: '소프트 핑크',
    isPurchased: false,
    requiresStory: true,
    ...sharedStore,
    detail: {
      headline: '소프트 베를린의 감성을 담은 참',
      description: '부드러운 컬러감의 시즌 한정 액세서리입니다.',
      specs: ['시즌 한정 참', '제조국: 대한민국'],
    },
  },
  'classic-visetos-charm': {
    id: 'classic-visetos-charm',
    name: '클래식 비세토스 참',
    price: 450000,
    imageUrl: bannerImage,
    colorLabel: '비세토스',
    isPurchased: false,
    requiresStory: true,
    ...sharedStore,
    detail: {
      headline: '클래식 비세토스 모노그램 참',
      description: '타임리스한 MCM 헤리티지를 담은 참입니다.',
      specs: ['시즌 한정 참', '비세토스 모노그램', '제조국: 대한민국'],
    },
  },
};

export function getSeasonProductDetailByIdFromMock(productId) {
  return seasonProductDetailsById[productId] ?? null;
}

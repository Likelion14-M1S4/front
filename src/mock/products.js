import homeBag1 from '../assets/icons/nav/home/home_bag1.svg';
import homeBag2 from '../assets/icons/nav/home/home_bag2.svg';
import homeBag3 from '../assets/icons/nav/home/home_bag3.svg';
import homeBag4 from '../assets/icons/nav/home/home_bag4.svg';

// =============================================================================
// 더미 데이터 — GET /api/products/recommended 배열 응답과 동일 스키마 유지
// 개수는 서버가 정함 (1개 이상 가변)
// =============================================================================

// detailUrl: 제품마다 다른 외부 사이트 (API에서 내려줌)
export const recommendedProducts = [
  {
    id: 'product-classic-tote',
    name: '클래식 토트 - 비세토스',
    description: '아이코닉한 비세토스 패턴의 클래식 토트백입니다.',
    imageUrl: homeBag1,
    detailUrl: 'https://www.mcmworldwide.com/en-kr/bags/totes/',
    price: 790000,
  },
  {
    id: 'stark-backpack-visetos',
    name: '스타크 백팩 - 비세토스',
    description:
      'MCM의 아이코닉한 비세토스 모노그램 캔버스로 제작되어 클래식함과 현대적인 실용성을 동시에 선사합니다.',
    imageUrl: homeBag2,
    detailUrl: 'https://www.mcmworldwide.com/en-kr/bags/backpacks/',
    price: 890000,
    isInitial: true,
  },
  {
    id: 'product-soft-berlin',
    name: '소프트 베를린 - 비세토스',
    description: '부드러운 실루엣의 소프트 베를린 백입니다.',
    imageUrl: homeBag3,
    detailUrl: 'https://www.mcmworldwide.com/en-kr/bags/shoulder-bags/',
    price: 850000,
  },
  {
    id: 'product-mini-pouch',
    name: '미니 파우치 - 비세토스',
    description: '데일리로 가볍게 들기 좋은 미니 파우치입니다.',
    imageUrl: homeBag4,
    detailUrl: 'https://www.mcmworldwide.com/en-kr/small-leather-goods/',
    price: 420000,
  },
];

// 하위 호환 (단일 추천이 필요할 때)
export const products = recommendedProducts;
export const todayRecommendedProduct =
  recommendedProducts.find((item) => item.isInitial) ?? recommendedProducts[0];

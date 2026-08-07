import productImage from '../assets/images/image3.svg';

// 상품 더미 데이터 (추후 GET /api/products 응답 형태와 동일하게 유지)
export const products = [
  {
    id: 'stark-backpack-visetos',
    name: '스타크 백팩 - 비세토스',
    description:
      'MCM의 아이코닉한 비세토스 모노그램 캔버스로 제작되어 클래식함과 현대적인 실용성을 동시에 선사합니다.',
    imageUrl: productImage,
    price: 890000,
  },
];

// 오늘의 추천 제품 1건 조회 (추후 axios API로 대체 예정)
export const todayRecommendedProduct = products[0];

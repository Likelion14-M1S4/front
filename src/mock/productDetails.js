import bannerImage from '../assets/images/image1.svg';
import storyImage from '../assets/images/image2.svg';
import productImage from '../assets/images/image3.svg';

// =============================================================================
// 더미 데이터 — GET /api/products/:productId 응답과 동일 스키마 유지
// =============================================================================

const starkDetail = {
  id: '1',
  name: 'Stark 사이드 스터드 비세토스 백팩',
  price: 1490000,
  imageUrl: productImage,
  isLiked: false,
  colorLabel: 'Soft Pink',
  colors: [
    { id: 'soft-pink', name: 'Soft Pink', imageUrl: productImage },
    { id: 'beige', name: 'Beige', imageUrl: storyImage },
    { id: 'black', name: 'Black', imageUrl: bannerImage },
    { id: 'white', name: 'White', imageUrl: productImage },
  ],
  sizes: ['미니', 'S'],
  selectedSize: '미니',
  storeCheckLabel: '구매 가능 매장 확인하기',
  storeUrl: '/story/stores',
  detail: {
    headline:
      '피라미드 모양 스터드 장식과 천연 나파 가죽 트림이 특징인 비세토스 모노그램 캔버스 백팩',
    description:
      '차분한 세련미를 선사하는 소프트 핑크 컬러. 비세토스 캔버스와 천연 나파 가죽으로 제작된 스타크 백팩의 미니 버전으로 피라미드 모양 스터드가 반짝이는 피니시가 실루엣을 장식합니다',
    specs: [
      '조절 가능한 어깨 스트랩',
      '가죽 손잡이 부분',
      'MCM 로고 플레이트',
      '전면 지퍼 수납공간',
      '외부 사이드 포켓과 스터드 장식',
      '양방향 지퍼 클로저',
      '내부 포켓 및 슬리브',
      '바디: 비세토스 모노그램 캔버스',
      '트림: 천연 나파 가죽',
      '18K 금 도금 메탈 하드웨어',
      '인조 나파 안감',
      '약 11 x 22 x 27 센티미터',
      '스트랩 길이: 72.5cm ~ 90cm, 핸들 드롭: 7cm',
      '제조국: 대한민국',
    ],
  },
};

const arenDetail = {
  id: '2',
  name: 'Aren 비세토스 호보',
  price: 1290000,
  imageUrl: storyImage,
  isLiked: false,
  colorLabel: 'Cognac',
  colors: [
    { id: 'cognac', name: 'Cognac', imageUrl: storyImage },
    { id: 'black', name: 'Black', imageUrl: bannerImage },
  ],
  sizes: ['미니', 'S'],
  selectedSize: '미니',
  storeCheckLabel: '구매 가능 매장 확인하기',
  storeUrl: '/story/stores',
  detail: {
    headline: '부드러운 실루엣의 비세토스 호보 백',
    description:
      '데일리로 착용하기 좋은 아렌 호보. 비세토스 모노그램 캔버스와 가죽 트림이 조화를 이룹니다.',
    specs: [
      '조절 가능한 숄더 스트랩',
      '자석 클로저',
      '내부 포켓',
      '바디: 비세토스 모노그램 캔버스',
      '제조국: 대한민국',
    ],
  },
};

const toteDetail = {
  id: '3',
  name: 'MCM 에센셜 토트',
  price: 2290000,
  imageUrl: bannerImage,
  isLiked: false,
  colorLabel: 'Visetos',
  colors: [
    { id: 'visetos', name: 'Visetos', imageUrl: bannerImage },
    { id: 'black', name: 'Black', imageUrl: productImage },
  ],
  sizes: ['미니', 'S'],
  selectedSize: 'S',
  storeCheckLabel: '구매 가능 매장 확인하기',
  storeUrl: '/story/stores',
  detail: {
    headline: '아이코닉한 비세토스 패턴의 에센셜 토트백',
    description: '넉넉한 수납과 클래식한 실루엣으로 완성된 MCM 에센셜 토트입니다.',
    specs: [
      '더블 탑 핸들',
      '내부 지퍼 포켓',
      '바디: 비세토스 모노그램 캔버스',
      '제조국: 대한민국',
    ],
  },
};

export const productDetailsById = {
  [starkDetail.id]: starkDetail,
  [arenDetail.id]: arenDetail,
  [toteDetail.id]: toteDetail,
};

export function getProductDetailByIdFromMock(productId) {
  return productDetailsById[productId] ?? null;
}

// 이름이 같은 제품의 id 조회 — 등록한 제품 상세에서 "제품 확인하기" 연결용
export function getProductIdByName(name) {
  const match = Object.values(productDetailsById).find((product) => product.name === name);
  return match?.id ?? null;
}

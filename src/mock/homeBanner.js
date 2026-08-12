import bannerImage from '../assets/images/image1.svg';

// 홈 상단 시즌 배너 더미 데이터 (추후 GET /api/home/banner 응답 형태와 동일하게 유지)
export const homeBanner = {
  id: 'banner-lion-collection',
  imageUrl: bannerImage,
  title: '시즌 제품 만나보기',
  description:
    '이번 시즌 새롭게 선보이는 새로운 컬렉션의\n특별한 이야기를 확인해보세요',
  linkTo: '/season',
};

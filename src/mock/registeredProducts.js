import image1 from '../assets/images/image1.svg';
import image2 from '../assets/images/image2.svg';
import image3 from '../assets/images/image3.svg';

// 더미 데이터 — GET /api/account/registered-products 응답과 동일 스키마 유지
export const registeredProducts = [
  {
    id: 'stark-side-stud-visetos',
    name: 'Stark 사이드 스터드 비세토스',
    imageUrl: image1,
    registeredAt: '2026.00.00',
  },
  {
    id: 'aren-visetos-hobo',
    name: 'Aren 비세토스 호보',
    imageUrl: image2,
    registeredAt: '2026.00.00',
  },
  {
    id: 'mcm-x-we-the-best',
    name: 'MCM X We The Best',
    imageUrl: image3,
    registeredAt: '2026.00.00',
  },
];

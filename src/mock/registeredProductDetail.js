import image1 from '../assets/images/image1.svg';
import image2 from '../assets/images/image2.svg';
import image3 from '../assets/images/image3.svg';

// 더미 데이터 — GET /api/account/registered-products/:id 응답과 동일 스키마 유지
export const registeredProductDetails = {
  'stark-side-stud-visetos': {
    id: 'stark-side-stud-visetos',
    name: 'Stark 사이드 스터드 비세토스 백팩',
    colorLabel: 'Soft Pink',
    sizeLabel: '미니',
    imageUrl: image1,
    purchasedAt: '2026.00.00 pm.03:00',
    registeredAt: '2026.00.00 pm.03:00',
    storeName: '롯데백화점 본점',
  },
  'aren-visetos-hobo': {
    id: 'aren-visetos-hobo',
    name: 'Aren 비세토스 호보',
    colorLabel: 'Cognac',
    sizeLabel: '미디움',
    imageUrl: image2,
    purchasedAt: '2026.00.00 pm.03:00',
    registeredAt: '2026.00.00 pm.03:00',
    storeName: '신세계면세점 본점',
  },
  'mcm-x-we-the-best': {
    id: 'mcm-x-we-the-best',
    name: 'MCM X We The Best',
    colorLabel: 'Black',
    sizeLabel: '원 사이즈',
    imageUrl: image3,
    purchasedAt: '2026.00.00 pm.03:00',
    registeredAt: '2026.00.00 pm.03:00',
    storeName: '신라면세점 본점',
  },
};

import image1 from '../assets/images/image1.svg';

// 요일별 운영시간 더미 — 매장마다 동일하게 사용
const defaultHours = [
  { day: '월요일', time: '10:30 - 20:00' },
  { day: '화요일', time: '10:30 - 20:00' },
  { day: '수요일', time: '10:30 - 20:00' },
  { day: '목요일', time: '10:30 - 20:00' },
  { day: '금요일', time: '10:30 - 20:30' },
  { day: '토요일', time: '10:30 - 20:30' },
  { day: '일요일', time: '10:30 - 20:30' },
];

// 더미 데이터 — GET /api/account/store-tag-history/:storeId 응답과 동일 스키마 유지
export const storeTagDetails = {
  'lotte-main': {
    storeName: '롯데백화점 본점',
    address: '서울 중구 남대문로 81, 롯데백화점 본점 1F 04533',
    phone: '+82-2-772-3198',
    hours: defaultHours,
    taggedGroups: [
      {
        date: '2026.00.00',
        products: [
          { id: 'lotte-p1', name: 'Stark 사이드 스터드 비세토스', imageUrl: image1 },
          { id: 'lotte-p2', name: 'Stark 사이드 스터드 비세토스', imageUrl: image1 },
          { id: 'lotte-p3', name: 'Stark 사이드 스터드 비세토스', imageUrl: image1 },
        ],
      },
      {
        date: '2026.00.00',
        products: [
          { id: 'lotte-p4', name: 'Stark 사이드 스터드 비세토스', imageUrl: image1 },
        ],
      },
      {
        date: '2026.00.00',
        products: [
          { id: 'lotte-p5', name: 'Stark 사이드 스터드 비세토스', imageUrl: image1 },
          { id: 'lotte-p6', name: 'Stark 사이드 스터드 비세토스', imageUrl: image1 },
        ],
      },
    ],
  },
  'house-flagship': {
    storeName: '하우스 플래그십 스토어',
    address: '서울 강남구 압구정로 46길 20',
    phone: '+82-2-511-3198',
    hours: defaultHours,
    taggedGroups: [
      {
        date: '2026.00.00',
        products: [
          { id: 'house-p1', name: 'Aren 비세토스 호보', imageUrl: image1 },
        ],
      },
    ],
  },
  'shilla-main': {
    storeName: '신라면세점 본점',
    address: '서울 중구 동호로 249, 신라면세점 본점',
    phone: '+82-2-2230-3388',
    hours: defaultHours,
    taggedGroups: [
      {
        date: '2026.00.00',
        products: [
          { id: 'shilla-p1', name: 'MCM X We The Best', imageUrl: image1 },
        ],
      },
    ],
  },
  'shinsegae-main': {
    storeName: '신세계면세점 본점',
    address: '서울 중구 소공로 63, 신세계백화점 본점 9F',
    phone: '+82-2-310-1234',
    hours: defaultHours,
    taggedGroups: [
      {
        date: '2026.00.00',
        products: [
          { id: 'shinsegae-p1', name: 'Aren 비세토스 호보', imageUrl: image1 },
        ],
      },
    ],
  },
};

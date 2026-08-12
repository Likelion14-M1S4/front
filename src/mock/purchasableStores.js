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

// 더미 데이터 — GET /api/stores 응답과 동일 스키마 유지
// id는 매장 태그 이력(mock/storeTagDetail.js)과 동일하게 맞춰둠
export const purchasableStores = [
  {
    id: 'lotte-main',
    name: 'MCM 롯데백화점 본점',
    address: '서울 중구 남대문로 81, 롯데백화점 본점 1F',
    postalCode: '04533',
    phone: '+82-2-772-3198',
    hours: defaultHours,
  },
  {
    id: 'house-flagship',
    name: 'MCM 하우스 플래그십 스토어',
    address: '서울 강남구 압구정로 46길 20',
    postalCode: '06015',
    phone: '+82-2-511-3198',
    hours: defaultHours,
  },
  {
    id: 'shilla-main',
    name: 'MCM 신라면세점 본점',
    address: '서울 중구 동호로 249, 신라면세점 본점',
    postalCode: '04593',
    phone: '+82-2-2230-3388',
    hours: defaultHours,
  },
  {
    id: 'shinsegae-main',
    name: 'MCM 신세계백화점 본점',
    address: '서울 중구 소공로 63, 신세계백화점 본점 9F',
    postalCode: '04530',
    phone: '+82-2-310-1234',
    hours: defaultHours,
  },
];

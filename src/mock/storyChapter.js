// 스토리 챕터 페이지 mock 데이터 (추후 백엔드 API 응답으로 교체)
export const storyChapterIntro = {
  season: 'Autumn Winter 2026',
  title: '스토리 챕터',
};

// 챕터 목록 — completed 여부는 저장하지 않고 api/storyProgress의 진행 기록으로 계산합니다.
// slides 배열 길이가 곧 상단 진행 바 세그먼트 개수라, 시즌/챕터마다 슬라이드 개수가
// 달라져도(예: 다음 시즌엔 4개/5개/2개) 이 배열에 데이터만 추가하면 그대로 반영됩니다.
export const chapters = [
  {
    id: 1,
    label: 'Chapter 1.',
    title: 'Introduction',
    description: '',
    large: false,
    slides: [
      {
        id: 1,
        type: 'normal',
        imageUrl: '',
        text: '스터드 디테일의 실루엣과 혁신적인 가죽 제품은 예술과 기술, 여행이 교차하는 하우스의 정체성을 드러내요.',
      },
      {
        id: 2,
        type: 'normal',
        imageUrl: '',
        text: '뮌헨에서 시작된 브랜드의 여정은 지금도 계속되고 있습니다.',
      },
      {
        id: 3,
        type: 'normal',
        imageUrl: '',
        text: '비세토스 모노그램은 하우스를 상징하는 시그니처 패턴이에요.',
      },
      {
        id: 4,
        type: 'normal',
        imageUrl: '',
        text: '전통과 혁신이 공존하는 디자인 철학을 소개합니다.',
      },
      {
        id: 5,
        type: 'normal',
        imageUrl: '',
        text: '비세토스 캔버스요. 하우스의 헤리티지를 가장 잘 담고 있거든요.',
      },
      {
        id: 6,
        type: 'normal',
        imageUrl: '',
        text: '뮌헨의 건축과 여행에서 영감을 많이 받아요.',
      },
      {
        id: 7,
        type: 'normal',
        imageUrl: '',
        text: '아직 비밀이에요! 시즌 스토리를 계속 지켜봐 주세요.',
      },
    ],
  },
  {
    id: 2,
    label: 'Chapter 2.',
    title: 'Collection History',
    description: '',
    large: false,
    slides: [
      { id: 1, type: 'normal', imageUrl: '', text: '컬렉션의 역사를 소개하는 내용이 들어갑니다.' },
      { id: 2, type: 'normal', imageUrl: '', text: '시즌마다 새롭게 재해석되는 클래식 라인업을 만나보세요.' },
      { id: 3, type: 'normal', imageUrl: '', text: '헤리티지와 현대적 감각이 만나는 지점을 담았습니다.' },
    ],
  },
  {
    id: 3,
    label: 'Chapter 3.',
    title: 'Craftmanship',
    description: '제품을 만든 장인과 공방 속의 이야기를 들여다봅니다.',
    large: true,
    slides: [
      { id: 1, type: 'normal', imageUrl: '', text: '제품을 만든 장인과 공방 속의 이야기를 들여다봅니다.' },
      { id: 2, type: 'normal', imageUrl: '', text: '한 땀 한 땀 손끝에서 완성되는 가죽 공예를 소개합니다.' },
      { id: 3, type: 'normal', imageUrl: '', text: '공방에서 사용하는 도구와 기법을 살펴봅니다.' },
      { id: 4, type: 'normal', imageUrl: '', text: '완성된 제품이 매장에 도착하기까지의 여정입니다.' },
    ],
  },
  {
    id: 4,
    label: 'Chapter 4.',
    title: 'Legacy', // 임시 제목 — 원하는 대로 수정
    description: '50주년을 맞은 하우스가 걸어온 길과 앞으로의 이야기를 들여다봅니다.', // 임시 설명 — 원하는 대로 수정
    large: true,
    slides: [
      { id: 1, type: 'normal', imageUrl: '', text: '50주년을 맞은 하우스가 걸어온 길과 앞으로의 이야기를 들여다봅니다.' },
      { id: 2, type: 'normal', imageUrl: '', text: '지난 시간 동안 쌓아온 유산을 소개합니다.' },
      { id: 3, type: 'normal', imageUrl: '', text: '앞으로 하우스가 그려갈 다음 이야기를 예고합니다.' },
    ],
  },
];

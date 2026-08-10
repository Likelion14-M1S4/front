// 스토리 챕터 페이지 mock 데이터 (추후 백엔드 API 응답으로 교체)
export const storyChapterIntro = {
  season: 'Autumn Winter 2026',
  title: '스토리 챕터',
};

export const chapters = [
  {
    id: 1,
    label: 'Chapter 1.',
    title: 'Introduction',
    description: '',
    completed: false,
    large: false,
  },
  {
    id: 2,
    label: 'Chapter 2.',
    title: 'Collection History',
    description: '',
    completed: false,
    large: false,
  },
  {
    id: 3,
    label: 'Chapter 3.',
    title: 'Craftmanship',
    description: '제품을 만든 장인과 공방 속의 이야기를 들여다봅니다.',
    completed: false,
    large: true,
  },
];

// 모든 챕터 완료 후 해금되는 최종 버튼 라벨
export const finalUnlockLabel = 'Chapter 3 완료 시 해금';
export const finalUnlockedLabel = '스토리 완료 보상 받기'; // 다 완료됐을 때 문구 (원하는 대로 수정)
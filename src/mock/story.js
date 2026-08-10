import storyImage from '../assets/images/image2.svg';
import productImage from '../assets/images/image3.svg';
import bannerImage from '../assets/images/image1.svg';

// 스토리 섹션 더미 데이터 (추후 GET /api/story/featured 응답 형태와 동일하게 유지)
export const featuredStory = {
  id: 'story-heritage',
  title: '스토리 진행',
  description:
    '뮌헨의 장인 정신과 헤리티지가 담긴 컬렉션의 탄생 비화를 라이언이 들려드립니다.',
  imageUrl: storyImage,
  linkTo: '/story',
};

// 스토리 페이지 상단 시즌 정보 (추후 GET /api/story 응답 형태와 동일하게 유지)
export const seasonStory = {
  season: 'Autumn Winter 2026',
  title: 'SEASON STORY',
  ctaLabel: '스토리 진행하기',
  thumbnailUrl: storyImage,
};

// 지난 시즌 스토리 목록 (추후 GET /api/story/past 응답 형태와 동일하게 유지, 개수 가변)
export const pastSeasonStories = [
  {
    id: 'past-story-milano',
    title: 'MCM과 함께하는 하루 - 밀라노 Edit',
    imageUrl: productImage,
  },
  {
    id: 'past-story-pina',
    title: 'Pina',
    imageUrl: bannerImage,
  },
];

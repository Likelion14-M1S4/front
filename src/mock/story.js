import storyImage from '../assets/images/image2.svg';

// 스토리 섹션 더미 데이터 (추후 GET /api/story/featured 응답 형태와 동일하게 유지)
export const featuredStory = {
  id: 'story-heritage',
  title: '스토리 진행',
  description:
    '뮌헨의 장인 정신과 헤리티지가 담긴 컬렉션의 탄생 비화를 라이언이 들려드립니다.',
  imageUrl: storyImage,
  linkTo: '/story',
};

import api from './axios';
import charmImage from '../assets/icons/nav/recommend/recommend-charm.svg';
import handbagImage from '../assets/icons/nav/recommend/recommend-handbag.svg';

/**
 * GET /api/products/recommendations
 * 추천 탭 화면 전체 구성(히어로 배너, 여정, 큐레이션, 베스트셀러)을 한 번에 반환한다.
 * 베스트셀러 products의 id는 GET /api/products/:productId 에 그대로 사용한다.
 * 히어로/큐레이션 배너 이미지는 백엔드 응답과 무관하게 프론트 고정 이미지를 사용한다.
 */
export async function getRecommendPage() {
  const { data } = await api.get('/api/products/recommendations');
  return normalizeRecommendPage(data.data);
}

function normalizeRecommendPage(data) {
  if (!data || typeof data !== 'object') {
    return {
      heroImageUrl: charmImage,
      heroLinkTo: '',
      journey: { title: '', subtitle: '' },
      curation: { title: '', imageUrl: handbagImage },
      bestsellers: { title: '', products: [] },
    };
  }

  const products = Array.isArray(data.bestsellers?.products)
    ? data.bestsellers.products.map((item) => ({
        id: item.id,
        name: item.name ?? '',
        price: item.price ?? null,
        imageUrl: item.imageUrl ?? item.imgUrl ?? '',
      }))
    : [];

  return {
    heroImageUrl: charmImage,
    heroLinkTo: data.heroLinkTo ?? '',
    journey: {
      title: data.journey?.title ?? '',
      subtitle: data.journey?.subtitle ?? '',
    },
    curation: {
      title: data.curation?.title ?? '',
      imageUrl: handbagImage,
    },
    bestsellers: {
      title: data.bestsellers?.title ?? '',
      products,
    },
  };
}

import api from './axios';
import { recommendPage } from '../mock/recommend';

// 백엔드 연동 전까지 mock 사용. 연동 시 axios 호출만 살리면 됩니다.

/**
 * GET /api/recommend
 *
 * 응답:
 * {
 *   heroImageUrl,
 *   heroLinkTo,  // 히어로 클릭 시 이동 경로 (예: /recommend/charms)
 *   journey: { title, subtitle },
 *   curation: { title, imageUrl },
 *   bestsellers: {
 *     title,
 *     products: [{ id, name, price, imageUrl }]
 *   }
 * }
 */
export async function getRecommendPage() {
  // const { data } = await api.get('/recommend');
  // return normalizeRecommendPage(data);

  return Promise.resolve(normalizeRecommendPage(recommendPage));
}

function normalizeRecommendPage(data) {
  if (!data || typeof data !== 'object') {
    return {
      heroImageUrl: '',
      heroLinkTo: '',
      journey: { title: '', subtitle: '' },
      curation: { title: '', imageUrl: '' },
      bestsellers: { title: '', products: [] },
    };
  }

  const products = Array.isArray(data.bestsellers?.products)
    ? data.bestsellers.products.map((item) => ({
        id: item.id,
        name: item.name ?? '',
        price: item.price ?? null,
        imageUrl: item.imageUrl ?? '',
      }))
    : [];

  return {
    heroImageUrl: data.heroImageUrl ?? '',
    heroLinkTo: data.heroLinkTo ?? '',
    journey: {
      title: data.journey?.title ?? '',
      subtitle: data.journey?.subtitle ?? '',
    },
    curation: {
      title: data.curation?.title ?? '',
      imageUrl: data.curation?.imageUrl ?? '',
    },
    bestsellers: {
      title: data.bestsellers?.title ?? '',
      products,
    },
  };
}

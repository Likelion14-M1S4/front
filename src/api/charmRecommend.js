import api from './axios';
import { charmRecommendPage } from '../mock/charmRecommend';

// 백엔드 연동 전까지 mock 사용. 연동 시 axios 호출만 살리면 됩니다.

/**
 * GET /api/recommend/charms
 *
 * 응답:
 * {
 *   featured: {
 *     id, name, collectionName, description, imageUrl,
 *     ctaLabel,  // CTA 문구
 *     ctaTo      // 앱 내 경로 (예: /story/chapter)
 *   },
 *   season: { title, imageUrl },
 *   charms: [{
 *     id, name, collectionName, imageUrl,
 *     productId?  // 있으면 /product/:productId 로 이동
 *   }]
 * }
 */
export async function getCharmRecommendPage() {
  // const { data } = await api.get('/recommend/charms');
  // return normalizeCharmRecommendPage(data);

  return Promise.resolve(normalizeCharmRecommendPage(charmRecommendPage));
}

function normalizeCharmRecommendPage(data) {
  if (!data || typeof data !== 'object') {
    return {
      featured: {
        id: '',
        name: '',
        collectionName: '',
        description: '',
        imageUrl: '',
        ctaLabel: '',
        ctaTo: '',
      },
      season: { title: '', imageUrl: '' },
      charms: [],
    };
  }

  const charms = Array.isArray(data.charms)
    ? data.charms.map((item) => ({
        id: item.id,
        name: item.name ?? '',
        collectionName: item.collectionName ?? '',
        imageUrl: item.imageUrl ?? '',
        productId: item.productId ?? null,
      }))
    : [];

  return {
    featured: {
      id: data.featured?.id ?? '',
      name: data.featured?.name ?? '',
      collectionName: data.featured?.collectionName ?? '',
      description: data.featured?.description ?? '',
      imageUrl: data.featured?.imageUrl ?? '',
      ctaLabel: data.featured?.ctaLabel ?? '',
      ctaTo: data.featured?.ctaTo ?? '',
    },
    season: {
      title: data.season?.title ?? '',
      imageUrl: data.season?.imageUrl ?? '',
    },
    charms,
  };
}

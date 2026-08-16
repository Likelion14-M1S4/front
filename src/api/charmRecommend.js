import api from './axios';
import { charmRecommendPage } from '../mock/charmRecommend';

/**
 * GET /api/charms/{charmId}/recommendations
 * 상단: 선택한 참 상세(charm)
 * 하단: 같은 시즌 참 목록(recommendations)
 * 시즌 배너는 mock.
 */
export async function getCharmRecommendPage() {
  const { data: listRes } = await api.get('/api/charms');
  const charmId = pickCharms(listRes.data)[0]?.id;

  if (charmId == null) {
    return {
      featured: emptyFeatured(),
      season: charmRecommendPage.season,
      charms: [],
    };
  }

  const { data } = await api.get(`/api/charms/${charmId}/recommendations`);
  const payload = data.data ?? {};
  const charm = payload.charm ?? {};
  const recommendations = Array.isArray(payload.recommendations)
    ? payload.recommendations
    : [];

  return {
    featured: {
      id: charm.id ?? '',
      name: charm.name ?? '',
      collectionName: charm.collectionName ?? charm.collection_name ?? '',
      description: charm.description ?? '',
      imageUrl: charm.imgUrl ?? charm.imageUrl ?? '',
      ctaLabel: charmRecommendPage.featured.ctaLabel,
      ctaTo: charmRecommendPage.featured.ctaTo,
    },
    season: charmRecommendPage.season,
    charms: recommendations.map((item) => ({
      id: item.id,
      name: item.name ?? '',
      collectionName: item.collectionName ?? item.collection_name ?? '',
      imageUrl: item.imgUrl ?? item.imageUrl ?? '',
      productId: item.productId ?? null,
    })),
  };
}

function emptyFeatured() {
  return {
    id: '',
    name: '',
    collectionName: '',
    description: '',
    imageUrl: '',
    ctaLabel: '',
    ctaTo: '',
  };
}

function pickCharms(payload) {
  if (Array.isArray(payload?.charms)) return payload.charms;
  if (Array.isArray(payload)) return payload;
  return [];
}

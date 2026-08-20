import api from './axios';
import seasonProductTop from '../assets/icons/nav/season_product/season_product-top.svg';

/**
 * GET /api/products/seasons/:season
 * 특정 시즌의 히어로 배너, 소개 문구, 제품 목록을 반환한다.
 * 현재 시즌 값: AW2026. 없는 시즌이면 빈 products로 응답한다.
 * 각 제품의 상세는 GET /api/products/:productId 로 조회한다.
 * 히어로(top) 이미지는 백엔드 응답과 무관하게 프론트 고정 이미지를 사용한다.
 */
export async function getSeasonProducts(season = 'AW2026') {
  const { data } = await api.get(`/api/products/seasons/${season}`);
  return normalizeSeasonProductsPage(data.data);
}

function normalizeSeasonProductsPage(data) {
  if (!data || typeof data !== 'object') {
    return {
      heroImageUrl: seasonProductTop,
      description: '',
      products: [],
    };
  }

  return {
    heroImageUrl: seasonProductTop,
    description: data.description ?? '',
    products: Array.isArray(data.products)
      ? data.products.map((item) => ({
          id: item.id,
          name: item.name ?? '',
          price: item.price ?? null,
          imageUrl: item.imageUrl ?? item.imgUrl ?? '',
        }))
      : [],
  };
}

/**
 * GET /api/charms/:charmId
 * 시즌 참 상세.
 */
export async function getSeasonProductById(productId) {
  const { data } = await api.get(`/api/charms/${productId}`);
  const detail = normalizeSeasonProductDetail(data.data);
  if (!detail) {
    const error = new Error('Season product not found');
    error.status = 404;
    return Promise.reject(error);
  }
  return detail;
}

function normalizeSeasonProductDetail(data) {
  if (!data || typeof data !== 'object') return null;

  const isPurchasable = data.isPurchasable === true;

  return {
    id: data.id,
    name: data.name ?? '',
    price: data.price ?? null,
    imageUrl: data.imgUrl ?? data.imageUrl ?? '',
    colorLabel: data.color ?? data.colorLabel ?? '',
    isPurchased: isPurchasable,
    requiresStory: !isPurchasable,
    storeCheckLabel: data.storeCheckLabel ?? '구매 가능 매장 확인하기',
    storeUrl: data.storeUrl ?? '/story/stores',
    purchaseUrl:
      data.purchaseUrl ??
      data.detailUrl ??
      data.productUrl ??
      data.url ??
      'https://www.mcmworldwide.com/en-kr/accessories/',
    detail: {
      headline: data.detail?.headline ?? data.collectionName ?? data.collection_name ?? '',
      description: data.detail?.description ?? data.description ?? '',
      specs: Array.isArray(data.detail?.specs)
        ? data.detail.specs.map(String)
        : [],
    },
  };
}

import api from './axios';
import { seasonProductsPage } from '../mock/seasonProducts';

/**
 * GET /api/season/products
 *
 * 응답:
 * {
 *   heroImageUrl, description,
 *   products: [{ id, name, price, imageUrl }]
 * }
 */
export async function getSeasonProducts() {
  return Promise.resolve(normalizeSeasonProductsPage(seasonProductsPage));
}

function normalizeSeasonProductsPage(data) {
  if (!data || typeof data !== 'object') {
    return {
      heroImageUrl: '',
      description: '',
      products: [],
    };
  }

  return {
    heroImageUrl: data.heroImageUrl ?? '',
    description: data.description ?? '',
    products: Array.isArray(data.products)
      ? data.products.map((item) => ({
          id: item.id,
          name: item.name ?? '',
          price: item.price ?? null,
          imageUrl: item.imageUrl ?? '',
        }))
      : [],
  };
}

/**
 * GET /api/charms/{charmId}
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
    colorLabel: data.colorLabel ?? data.collectionName ?? data.collection_name ?? '',
    isPurchased: isPurchasable,
    requiresStory: !isPurchasable,
    storeCheckLabel: data.storeCheckLabel ?? '구매 가능 매장 확인하기',
    storeUrl: data.storeUrl ?? '/story/stores',
    detail: {
      headline: data.detail?.headline ?? data.collectionName ?? data.collection_name ?? '',
      description: data.detail?.description ?? data.description ?? '',
      specs: Array.isArray(data.detail?.specs)
        ? data.detail.specs.map(String)
        : [],
    },
  };
}

import api from './axios';
import {
  seasonProductsPage,
  getSeasonProductDetailByIdFromMock,
} from '../mock/seasonProducts';

// 백엔드 연동 전까지 mock 사용. 연동 시 axios 호출만 살리면 됩니다.

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
  // const { data } = await api.get('/season/products');
  // return normalizeSeasonProductsPage(data);

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
 * GET /api/season/products/:productId
 *
 * 응답:
 * {
 *   id, name, price, imageUrl, colorLabel,
 *   isPurchased, requiresStory,
 *   storeCheckLabel, storeUrl,
 *   detail: { headline, description, specs: string[] }
 * }
 */
export async function getSeasonProductById(productId) {
  // const { data } = await api.get(`/season/products/${productId}`);
  // return normalizeSeasonProductDetail(data);

  const data = getSeasonProductDetailByIdFromMock(productId);
  if (!data) {
    const error = new Error('Season product not found');
    error.status = 404;
    return Promise.reject(error);
  }

  return Promise.resolve(normalizeSeasonProductDetail(data));
}

function normalizeSeasonProductDetail(data) {
  if (!data || typeof data !== 'object') return null;

  return {
    id: data.id,
    name: data.name ?? '',
    price: data.price ?? null,
    imageUrl: data.imageUrl ?? '',
    colorLabel: data.colorLabel ?? '',
    isPurchased: Boolean(data.isPurchased),
    requiresStory: data.requiresStory !== false,
    storeCheckLabel: data.storeCheckLabel ?? '구매 가능 매장 확인하기',
    storeUrl: data.storeUrl ?? '',
    detail: {
      headline: data.detail?.headline ?? '',
      description: data.detail?.description ?? '',
      specs: Array.isArray(data.detail?.specs)
        ? data.detail.specs.map(String)
        : [],
    },
  };
}

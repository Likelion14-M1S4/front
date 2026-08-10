import api from './axios';
import { recommendedProducts, todayRecommendedProduct } from '../mock/products';
import { getProductDetailByIdFromMock } from '../mock/productDetails';

// 백엔드 연동 전까지 mock 사용. 연동 시 axios 호출만 살리면 됩니다.

/**
 * GET /api/products/recommended
 *
 * 응답 항목:
 * {
 *   id, name, description, imageUrl,
 *   detailUrl,  // 제품별 외부 사이트 URL (클릭 시 이동)
 *   price?, isInitial?
 * }
 */
export async function getRecommendedProducts() {
  // const { data } = await api.get('/products/recommended');
  // return normalizeRecommendedProducts(data);

  return Promise.resolve(normalizeRecommendedProducts(recommendedProducts));
}

function normalizeRecommendedProducts(data) {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    id: item.id,
    name: item.name ?? '',
    description: item.description ?? '',
    imageUrl: item.imageUrl ?? '',
    detailUrl: item.detailUrl ?? '',
    price: item.price ?? null,
    isInitial: Boolean(item.isInitial),
  }));
}

/**
 * GET /api/products/:productId
 *
 * 응답:
 * {
 *   id, name, price, imageUrl, isLiked,
 *   colorLabel, colors: [{ id, name, imageUrl }],
 *   sizes: string[], selectedSize,
 *   storeCheckLabel, storeUrl,
 *   detail: { headline, description, specs: string[] }
 * }
 */
export async function getProductById(productId) {
  // const { data } = await api.get(`/products/${productId}`);
  // return normalizeProductDetail(data);

  const data = getProductDetailByIdFromMock(productId);
  if (!data) {
    const error = new Error('Product not found');
    error.status = 404;
    return Promise.reject(error);
  }

  return Promise.resolve(normalizeProductDetail(data));
}

function normalizeProductDetail(data) {
  if (!data || typeof data !== 'object') return null;

  return {
    id: data.id,
    name: data.name ?? '',
    price: data.price ?? null,
    imageUrl: data.imageUrl ?? '',
    isLiked: Boolean(data.isLiked),
    colorLabel: data.colorLabel ?? '',
    colors: Array.isArray(data.colors)
      ? data.colors.map((color) => ({
          id: color.id,
          name: color.name ?? '',
          imageUrl: color.imageUrl ?? '',
        }))
      : [],
    sizes: Array.isArray(data.sizes) ? data.sizes.map(String) : [],
    selectedSize: data.selectedSize ?? '',
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

/** @deprecated 홈 캐러셀은 getRecommendedProducts 사용 */
export async function getTodayRecommendedProduct() {
  // const { data } = await api.get('/products/recommended/today');
  // return data;

  return Promise.resolve(todayRecommendedProduct);
}

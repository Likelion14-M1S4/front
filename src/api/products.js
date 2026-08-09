import api from './axios';
import { recommendedProducts, todayRecommendedProduct } from '../mock/products';

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

/** @deprecated 홈 캐러셀은 getRecommendedProducts 사용 */
export async function getTodayRecommendedProduct() {
  // const { data } = await api.get('/products/recommended/today');
  // return data;

  return Promise.resolve(todayRecommendedProduct);
}

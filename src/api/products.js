import api from './axios';
import { recommendedProducts, todayRecommendedProduct } from '../mock/products';

/**
 * GET /api/products/recommended
 * 홈 추천 제품 목록. mock 유지.
 */
export async function getRecommendedProducts() {
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
 * 단일 제품의 상세 정보를 반환한다. 시즌 제품 상세 화면에서도 이 API를 사용한다.
 * colors: 동일 디자인의 색상 옵션. 각 항목의 id로 이 API를 다시 호출하면 해당 색상 상세로 전환한다.
 * isLiked / isPurchased: 로그인 유저 기준 찜·구매 여부
 * requiresStory: 시즌 제품의 스토리 완주 후 구매 가능 정책
 */
export async function getProductById(productId) {
  const { data } = await api.get(`/api/products/${productId}`);
  return normalizeProductDetail(data.data);
}

function normalizeProductDetail(data) {
  if (!data || typeof data !== 'object') return null;

  return {
    id: data.id,
    name: data.name ?? '',
    price: data.price ?? null,
    imageUrl: data.imageUrl ?? data.imgUrl ?? '',
    isLiked: Boolean(data.isLiked),
    isPurchased: Boolean(data.isPurchased),
    requiresStory: Boolean(data.requiresStory),
    colorLabel: data.colorLabel ?? '',
    colors: Array.isArray(data.colors)
      ? data.colors.map((color) => ({
          id: color.id,
          name: color.name ?? '',
          imageUrl: color.imageUrl ?? color.imgUrl ?? '',
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

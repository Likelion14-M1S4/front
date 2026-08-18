import api from './axios';

/**
 * GET /api/products/my
 * 로그인 유저가 구매(등록)한 제품 목록을 최근 구매 순으로 반환한다.
 * 각 항목의 id는 구매 기록 id이며, GET /api/products/my/:orderItemId 에 그대로 사용한다.
 */
export async function getRegisteredProducts() {
  const { data } = await api.get('/api/products/my');
  return normalizeRegisteredProducts(data.data);
}

function normalizeRegisteredProducts(data) {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    id: item.id,
    name: item.name ?? '',
    imageUrl: item.imageUrl ?? item.imgUrl ?? '',
    registeredAt: item.registeredAt ?? '',
  }));
}

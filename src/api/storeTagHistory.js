import api from './axios';

/**
 * GET /api/products/tags
 * 로그인 유저가 태그한 매장 목록을 최근 방문 순으로 반환한다.
 * 각 항목의 id(매장 id)를 매장 태그 상세 조회(GET /api/products/tags/:storeId)에 그대로 사용한다.
 */
export async function getStoreTagHistory() {
  const { data } = await api.get('/api/products/tags');
  return normalizeStoreTagHistory(data.data);
}

function normalizeStoreTagHistory(data) {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    id: item.id,
    storeName: item.storeName ?? '',
    lastVisitedAt: item.lastVisitedAt ?? '',
  }));
}

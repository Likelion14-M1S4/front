import api from './axios';

/**
 * GET /api/products/my/:orderItemId
 * 구매 기록 하나의 상세(색상/사이즈/구매·등록 일시/매장)를 반환한다.
 * orderItemId는 등록 제품 목록 응답의 id를 그대로 사용한다. 본인 구매 기록만 조회된다.
 */
export async function getRegisteredProductDetail(orderItemId) {
  const { data } = await api.get(`/api/products/my/${orderItemId}`);
  return normalizeRegisteredProductDetail(data.data);
}

function normalizeRegisteredProductDetail(data) {
  if (!data || typeof data !== 'object') return null;

  return {
    id: data.id,
    name: data.name ?? '',
    colorLabel: data.colorLabel ?? '',
    sizeLabel: data.sizeLabel ?? '',
    imageUrl: data.imageUrl ?? data.imgUrl ?? '',
    purchasedAt: data.purchasedAt ?? '',
    registeredAt: data.registeredAt ?? '',
    storeName: data.storeName ?? '',
  };
}

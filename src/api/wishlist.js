import api from './axios';

/**
 * GET /api/wishlist
 * 찜한 제품·참을 최근 찜한 순으로 반환. targetId는 type에 따라 product.id 또는 charm.id.
 */
export async function getWishlist() {
  const { data } = await api.get('/api/wishlist');
  return normalizeWishlist(data.data.items);
}

function normalizeWishlist(items) {
  if (!Array.isArray(items)) return [];

  return items.map((item) => ({
    id: item.id,
    type: item.type,
    targetId: item.targetId,
    name: item.name ?? '',
    imageUrl: item.imgUrl ?? '',
    colorLabel: item.colorLabel ?? '',
  }));
}

/**
 * POST /api/wishlist/toggle
 * 이미 찜한 상태면 해제, 아니면 찜 추가. productId/charmId 중 정확히 하나만 보냅니다.
 * @param {{ productId?: number, charmId?: number }} target
 * @returns {Promise<{ type: 'PRODUCT' | 'CHARM', targetId: number, isWished: boolean }>}
 */
export async function toggleWishlist({ productId, charmId }) {
  const { data } = await api.post('/api/wishlist/toggle', {
    productId: productId != null ? Number(productId) : null,
    charmId: charmId != null ? Number(charmId) : null,
  });
  return data.data;
}

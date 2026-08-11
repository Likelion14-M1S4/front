import api from './axios';
import { wishlistItems } from '../mock/wishlist';

// 백엔드 연동 전까지 mock 사용. 연동 시 axios 호출만 살리면 됩니다.

/**
 * GET /api/wishlist
 *
 * 응답 항목:
 * { id, name, colorLabel, imageUrl }
 */
export async function getWishlist() {
  // const { data } = await api.get('/wishlist');
  // return normalizeWishlist(data);

  return Promise.resolve(normalizeWishlist(wishlistItems));
}

function normalizeWishlist(data) {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    id: item.id,
    name: item.name ?? '',
    colorLabel: item.colorLabel ?? '',
    imageUrl: item.imageUrl ?? '',
  }));
}

/** DELETE /api/wishlist/:id */
export async function removeWishlistItem(id) {
  // await api.delete(`/wishlist/${id}`);
  return Promise.resolve(id);
}

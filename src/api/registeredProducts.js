import api from './axios';
import { registeredProducts } from '../mock/registeredProducts';

// 백엔드 연동 전까지 mock 사용. 연동 시 axios 호출만 살리면 됩니다.

/**
 * GET /api/account/registered-products
 *
 * 응답 항목:
 * { id, name, imageUrl, registeredAt }
 */
export async function getRegisteredProducts() {
  // const { data } = await api.get('/account/registered-products');
  // return normalizeRegisteredProducts(data);

  return Promise.resolve(normalizeRegisteredProducts(registeredProducts));
}

function normalizeRegisteredProducts(data) {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    id: item.id,
    name: item.name ?? '',
    imageUrl: item.imageUrl ?? '',
    registeredAt: item.registeredAt ?? '',
  }));
}

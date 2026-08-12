import api from './axios';
import { registeredProductDetails } from '../mock/registeredProductDetail';

// 백엔드 연동 전까지 mock 사용. 연동 시 axios 호출만 살리면 됩니다.

/**
 * GET /api/account/registered-products/:productId
 *
 * 응답:
 * { id, name, colorLabel, sizeLabel, imageUrl, purchasedAt, registeredAt, storeName }
 */
export async function getRegisteredProductDetail(productId) {
  // const { data } = await api.get(`/account/registered-products/${productId}`);
  // return normalizeRegisteredProductDetail(data);

  const data = registeredProductDetails[productId];
  if (!data) {
    const error = new Error('Registered product not found');
    error.status = 404;
    return Promise.reject(error);
  }

  return Promise.resolve(normalizeRegisteredProductDetail(data));
}

function normalizeRegisteredProductDetail(data) {
  return {
    id: data.id,
    name: data.name ?? '',
    colorLabel: data.colorLabel ?? '',
    sizeLabel: data.sizeLabel ?? '',
    imageUrl: data.imageUrl ?? '',
    purchasedAt: data.purchasedAt ?? '',
    registeredAt: data.registeredAt ?? '',
    storeName: data.storeName ?? '',
  };
}

import api from './axios';
import { storeTagDetails } from '../mock/storeTagDetail';

// 백엔드 연동 전까지 mock 사용. 연동 시 axios 호출만 살리면 됩니다.

/**
 * GET /api/account/store-tag-history/:storeId
 *
 * 응답:
 * {
 *   storeName, address, phone,
 *   hours: [{ day, time }],
 *   taggedGroups: [{ date, products: [{ id, name, imageUrl }] }]
 * }
 */
export async function getStoreTagDetail(storeId) {
  // const { data } = await api.get(`/account/store-tag-history/${storeId}`);
  // return normalizeStoreTagDetail(data);

  const data = storeTagDetails[storeId];
  if (!data) {
    const error = new Error('Store not found');
    error.status = 404;
    return Promise.reject(error);
  }

  return Promise.resolve(normalizeStoreTagDetail(data));
}

function normalizeStoreTagDetail(data) {
  return {
    storeName: data.storeName ?? '',
    address: data.address ?? '',
    phone: data.phone ?? '',
    hours: Array.isArray(data.hours)
      ? data.hours.map((item) => ({
          day: item.day ?? '',
          time: item.time ?? '',
        }))
      : [],
    taggedGroups: Array.isArray(data.taggedGroups)
      ? data.taggedGroups.map((group) => ({
          date: group.date ?? '',
          products: Array.isArray(group.products)
            ? group.products.map((product) => ({
                id: product.id,
                name: product.name ?? '',
                imageUrl: product.imageUrl ?? '',
              }))
            : [],
        }))
      : [],
  };
}

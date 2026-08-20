import api from './axios';
import { purchasableStores } from '../mock/purchasableStores';

// 백엔드 연동 전까지 mock 사용. 연동 시 axios 호출만 살리면 됩니다.

/**
 * GET /api/stores
 *
 * 응답 항목:
 * { id, name, address, postalCode, phone, hours: [{ day, time }] }
 */
export async function getPurchasableStores() {
  // const { data } = await api.get('/stores');
  // return normalizePurchasableStores(data);

  return Promise.resolve(normalizePurchasableStores(purchasableStores));
}

function normalizePurchasableStores(data) {
  if (!Array.isArray(data)) return [];

  return data.map((store) => ({
    id: store.id,
    name: store.name ?? '',
    address: store.address ?? '',
    postalCode: store.postalCode ?? '',
    phone: store.phone ?? '',
    hours: Array.isArray(store.hours)
      ? store.hours.map((item) => ({
          day: item.day ?? '',
          time: item.time ?? '',
        }))
      : [],
  }));
}

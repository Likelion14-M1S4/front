import api from './axios';
import { storeTagHistory } from '../mock/storeTagHistory';

// 백엔드 연동 전까지 mock 사용. 연동 시 axios 호출만 살리면 됩니다.

/**
 * GET /api/account/store-tag-history
 *
 * 응답 항목:
 * { id, storeName, lastVisitedAt }
 */
export async function getStoreTagHistory() {
  // const { data } = await api.get('/account/store-tag-history');
  // return normalizeStoreTagHistory(data);

  return Promise.resolve(normalizeStoreTagHistory(storeTagHistory));
}

function normalizeStoreTagHistory(data) {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    id: item.id,
    storeName: item.storeName ?? '',
    lastVisitedAt: item.lastVisitedAt ?? '',
  }));
}

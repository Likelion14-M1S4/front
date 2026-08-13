import api from './axios';
import { storeTagNfcResult } from '../mock/storeTagNfc';

// 백엔드 연동 전까지 mock 사용. 연동 시 axios 호출만 살리면 됩니다.

/**
 * POST /api/store-tag/nfc
 *
 * 요청 (연동 시):
 * { tagId?: string, rawPayload?: string }
 *
 * 응답:
 * {
 *   storeId, storeName,
 *   nextPath  // 연결 성공 후 이동 경로 (예: '/home', '/account/tag-history/:storeId')
 * }
 *
 * 로딩 화면은 이 Promise가 resolve될 때까지 유지됩니다.
 */
export async function readStoreTagNfc(payload = {}) {
  // const { data } = await api.post('/store-tag/nfc', payload);
  // return normalizeStoreTagNfc(data);

  // mock: NFC 읽기 지연 시뮬레이션 (연결될 때까지 로딩 유지)
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return Promise.resolve(normalizeStoreTagNfc(storeTagNfcResult));
}

function normalizeStoreTagNfc(data) {
  if (!data || typeof data !== 'object') return null;

  return {
    storeId: data.storeId ?? '',
    storeName: data.storeName ?? '',
    nextPath: data.nextPath || '/home',
  };
}

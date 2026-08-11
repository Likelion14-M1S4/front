import api from './axios';
import { availableCharmsPage } from '../mock/availableCharms';

// 백엔드 연동 전까지 mock 사용. 연동 시 axios 호출만 살리면 됩니다.

/**
 * GET /api/account/available-charms
 *
 * 응답:
 * {
 *   collectionName,  // 현재 선택된 컬렉션
 *   charms: [{ id, name, collectionName, imageUrl }]
 * }
 */
export async function getAvailableCharms() {
  // const { data } = await api.get('/account/available-charms');
  // return normalizeAvailableCharms(data);

  return Promise.resolve(normalizeAvailableCharms(availableCharmsPage));
}

function normalizeAvailableCharms(data) {
  if (!data || typeof data !== 'object') {
    return { collectionName: '', charms: [] };
  }

  return {
    collectionName: data.collectionName ?? '',
    charms: Array.isArray(data.charms)
      ? data.charms.map((charm) => ({
          id: charm.id,
          name: charm.name ?? '',
          collectionName: charm.collectionName ?? '',
          imageUrl: charm.imageUrl ?? '',
        }))
      : [],
  };
}

import api from './axios';
import { characterCatalog } from '../mock/characters';

// 백엔드 연동 전까지 mock 사용. 연동 시 axios 호출만 살리면 됩니다.

/**
 * GET /api/store-tag/character
 *
 * 응답:
 * { id, name, collectionName, description, imageUrl }
 */
export async function getTaggedCharacter() {
  // const { data } = await api.get('/store-tag/character');
  // return normalizeTaggedCharacter(data);

  return Promise.resolve(normalizeTaggedCharacter(characterCatalog[0]));
}

/**
 * POST /api/store-tag/character/:characterId/collect
 */
export async function addCharacterToCollection(characterId) {
  // const { data } = await api.post(`/store-tag/character/${characterId}/collect`);
  // return data;

  return Promise.resolve({ id: characterId, collected: true });
}

function normalizeTaggedCharacter(data) {
  return {
    id: data?.id ?? '',
    name: data?.name ?? '',
    collectionName: data?.collectionName ?? '',
    description: data?.description ?? '',
    imageUrl: data?.imageUrl ?? '',
  };
}

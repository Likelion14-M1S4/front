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
 * POST /api/characters/:characterId/collect
 * NFC 태그로 얻은 캐릭터를 내 컬렉션에 추가한다. 이미 수집한 캐릭터를 다시 추가해도 성공으로 응답한다(멱등).
 */
export async function addCharacterToCollection(characterId) {
  const { data } = await api.post(`/api/characters/${characterId}/collect`);
  return data.data;
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

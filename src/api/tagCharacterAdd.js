import api from './axios';

/**
 * POST /api/characters/:characterId/collect
 * NFC 태그로 얻은 캐릭터를 내 컬렉션에 추가한다. 이미 수집한 캐릭터를 다시 추가해도 성공으로 응답한다(멱등).
 */
export async function addCharacterToCollection(characterId) {
  const { data } = await api.post(`/api/characters/${characterId}/collect`);
  return data.data;
}

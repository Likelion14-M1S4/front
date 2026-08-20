import api from './axios';

/**
 * GET /api/charms
 * 컬렉션(갤러리) 목록.
 */
export async function getCollectedCharacters() {
  const { data } = await api.get('/api/charms');
  return normalizeCharmList(data.data);
}

function normalizeCharmList(payload) {
  const charms = Array.isArray(payload?.charms)
    ? payload.charms
    : Array.isArray(payload)
      ? payload
      : [];

  return charms.map((charm) => ({
    id: charm.id,
    characterId: charm.characterId,
    name: charm.name ?? '',
    collectionName: charm.collectionName ?? charm.collection_name ?? '',
    collectionSubtitle: charm.collectionSubtitle ?? '',
    thumbnailUrl: charm.imgUrl ?? charm.thumbnailUrl ?? charm.imageUrl ?? '',
    collectedAt: charm.collectedAt ?? null,
  }));
}

/**
 * GET /api/charms/{charmId}
 * 컬렉션에서 참을 눌렀을 때 쓰는 상세.
 */
export async function getCollectedCharacterById(characterId) {
  const { data } = await api.get(`/api/charms/${characterId}`);
  return normalizeCollectedCharacterDetail(data.data);
}

export function normalizeCollectedCharacterDetail(data) {
  if (!data) return null;

  const imageUrl = data.imgUrl ?? data.imageUrl ?? data.thumbnailUrl ?? '';
  const personality = data.character?.personality ?? '';

  const sections = Array.isArray(data.sections)
    ? data.sections
        .filter((section) => section?.type === 'character')
        .map((section) => ({
          type: section.type,
          title: section.title ?? '',
          content: section.content ?? '',
        }))
        .filter((section) => section.type)
    : personality
      ? [{ type: 'character', title: '캐릭터', content: personality }]
      : [];

  return {
    id: data.id,
    characterId: data.characterId,
    name: data.name ?? '',
    collectionName: data.collectionName ?? data.collection_name ?? '',
    collectionSubtitle: data.collectionSubtitle ?? '',
    thumbnailUrl: imageUrl,
    imageUrl,
    description: data.description ?? personality,
    collectedAt: data.collectedAt ?? null,
    sections,
  };
}

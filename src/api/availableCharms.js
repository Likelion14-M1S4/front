import api from './axios';

/**
 * GET /api/charms/purchasable
 * 구매(수령) 가능한 시즌 한정 참 목록.
 */
export async function getAvailableCharms() {
  const { data } = await api.get('/api/charms/purchasable');
  return normalizeAvailableCharms(data.data);
}

function normalizeCharmCard(charm) {
  return {
    id: charm.id,
    name: charm.name ?? '',
    collectionName: charm.collectionName ?? charm.collection_name ?? '',
    imageUrl: charm.imgUrl ?? charm.imageUrl ?? '',
  };
}

function flattenGroupedCharms(data) {
  if (!data || typeof data !== 'object') return [];

  const groupedArray = data.collections ?? data.groups ?? data.collectionGroups;
  if (Array.isArray(groupedArray)) {
    return groupedArray.flatMap((group) =>
      (group.charms ?? []).map((charm) => ({
        ...normalizeCharmCard(charm),
        collectionName:
          charm.collectionName ??
          charm.collection_name ??
          group.collectionName ??
          group.collection_name ??
          '',
      })),
    );
  }

  if (Array.isArray(data.charms)) {
    return data.charms.map(normalizeCharmCard);
  }

  return Object.entries(data)
    .filter(([, value]) => Array.isArray(value))
    .flatMap(([collectionName, charms]) =>
      charms.map((charm) => ({
        ...normalizeCharmCard(charm),
        collectionName: charm.collectionName ?? charm.collection_name ?? collectionName,
      })),
    );
}

function normalizeAvailableCharms(data) {
  const charms = flattenGroupedCharms(data);

  return {
    collectionName: data?.collectionName ?? charms[0]?.collectionName ?? '',
    charms,
  };
}

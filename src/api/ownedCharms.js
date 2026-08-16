import api from './axios';

/**
 * GET /api/charms/owned
 * 수령 완료(COMPLETED) 참. 컬렉션명 그룹은 화면용 collectionName/charms 로 펼침.
 */
export async function getOwnedCharms() {
  const { data } = await api.get('/api/charms/owned');
  return normalizeOwnedCharms(data.data);
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

function normalizeOwnedCharms(data) {
  const charms = flattenGroupedCharms(data);

  return {
    collectionName: data?.collectionName ?? charms[0]?.collectionName ?? '',
    charms,
  };
}

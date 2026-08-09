import api from './axios';
import {
  collectedCharacters,
  getCollectedCharacterById as getCollectedCharacterByIdFromMock,
} from '../mock/characters';

// 백엔드 연동 전까지 mock을 사용합니다.
// 연동 시 주석 처리된 axios 호출만 살리면 됩니다.

/**
 * GET /api/characters/collected
 * @returns {Promise<Array<{
 *   id: string,
 *   name: string,
 *   collectionName: string,
 *   collectionSubtitle: string,
 *   thumbnailUrl: string,
 *   collectedAt: string | null
 * }>>}
 */
export async function getCollectedCharacters() {
  // const { data } = await api.get('/characters/collected');
  // return data;

  return Promise.resolve(collectedCharacters);
}

/**
 * GET /api/characters/collected/:characterId
 *
 * 상세 응답 예시:
 * {
 *   id, name, collectionName, collectionSubtitle,
 *   thumbnailUrl, imageUrl, description, collectedAt,
 *   sections: [
 *     { type: 'character', title: '캐릭터', content: string },
 *     {
 *       type: 'product',
 *       title: '제품',
 *       items: [{
 *         id, name, color, imageUrl, detailUrl,
 *         collectionName?, collectionSubtitle?
 *       }]
 *     },
 *     { type: 'care', title: '관리', content: string }
 *   ]
 * }
 * detailUrl: 제품 상세용 외부 사이트 URL (앱 내부 /product 페이지 아님)
 *
 * UI는 sections 배열을 그대로 렌더합니다. title/content/items는 서버 값을 사용합니다.
 */
export async function getCollectedCharacterById(characterId) {
  // const { data } = await api.get(`/characters/collected/${characterId}`);
  // return normalizeCollectedCharacterDetail(data);

  const data = getCollectedCharacterByIdFromMock(characterId);
  return Promise.resolve(normalizeCollectedCharacterDetail(data));
}

/** API/mock 응답을 화면에서 쓰기 안전한 형태로 맞춤 */
export function normalizeCollectedCharacterDetail(data) {
  if (!data) return null;

  const sections = Array.isArray(data.sections)
    ? data.sections.map((section) => normalizeSection(section)).filter(Boolean)
    : [];

  return {
    id: data.id,
    name: data.name ?? '',
    collectionName: data.collectionName ?? '',
    collectionSubtitle: data.collectionSubtitle ?? '',
    thumbnailUrl: data.thumbnailUrl ?? '',
    imageUrl: data.imageUrl ?? '',
    description: data.description ?? '',
    collectedAt: data.collectedAt ?? null,
    sections,
  };
}

function normalizeSection(section) {
  if (!section?.type) return null;

  if (section.type === 'product') {
    return {
      type: 'product',
      title: section.title ?? '제품',
      items: Array.isArray(section.items)
        ? section.items.map((item) => ({
            id: item.id,
            name: item.name ?? '',
            color: item.color ?? '',
            imageUrl: item.imageUrl ?? '',
            collectionName: item.collectionName ?? '',
            collectionSubtitle: item.collectionSubtitle ?? '',
            detailUrl: item.detailUrl ?? '',
          }))
        : [],
    };
  }

  return {
    type: section.type,
    title: section.title ?? '',
    content: section.content ?? '',
  };
}

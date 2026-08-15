import image1 from '../assets/images/image1.svg';
import image2 from '../assets/images/image2.svg';
import image3 from '../assets/images/image3.svg';

// =============================================================================
// 더미 데이터 (백엔드 연동 전용)
// 실제 응답 스키마는 src/api/characters.js 주석과 동일하게 유지하세요.
// =============================================================================

const DUMMY_DESCRIPTION =
  '항상 침착하고 여유로운 태도를 유지하며, 화려하게 자신을 드러내기보다 자연스럽게 존재감을 보여줍니다.';

// 캐릭터 마스터 더미
export const characterCatalog = [
  {
    id: 'character-visetos-lion',
    name: '비세토스 라이언',
    collectionName: 'MCM BASIC COLLECTION',
    collectionSubtitle: '베스트 라인',
    thumbnailUrl: image1,
    imageUrl: image1,
    description: DUMMY_DESCRIPTION,
    sections: [
      {
        type: 'character',
        title: '캐릭터',
        content: '독일 뮌헨의 정신을 이어받은 MCM의 상징적인 라이온 캐릭터입니다.',
      },
    ],
  },
  {
    id: 'character-classic-rabbit',
    name: '클래식 래빗',
    collectionName: 'MCM BASIC COLLECTION',
    collectionSubtitle: '베스트 라인',
    thumbnailUrl: image2,
    imageUrl: image2,
    description: DUMMY_DESCRIPTION,
    sections: [
      {
        type: 'character',
        title: '캐릭터',
        content: '클래식 라인의 감성을 담은 MCM의 래빗 캐릭터입니다.',
      },
    ],
  },
  {
    id: 'character-munich-bear',
    name: '뮌헨 베어',
    collectionName: 'MCM BASIC COLLECTION',
    collectionSubtitle: '베스트 라인',
    thumbnailUrl: image3,
    imageUrl: image3,
    description: DUMMY_DESCRIPTION,
    sections: [
      {
        type: 'character',
        title: '캐릭터',
        content: '뮌헨의 여유로운 분위기를 담은 MCM의 베어 캐릭터입니다.',
      },
    ],
  },
];

export const collectedCharacterIds = [
  'character-visetos-lion',
  'character-classic-rabbit',
  'character-munich-bear',
];

export const collectedCharacterMeta = {
  'character-visetos-lion': { collectedAt: '2026-07-12T10:00:00.000Z' },
  'character-classic-rabbit': { collectedAt: '2026-07-28T14:30:00.000Z' },
  'character-munich-bear': { collectedAt: '2026-08-05T09:15:00.000Z' },
};

// GET /api/characters/collected 더미 응답
export const collectedCharacters = collectedCharacterIds
  .map((id) => {
    const character = characterCatalog.find((item) => item.id === id);
    if (!character) return null;

    return {
      id: character.id,
      name: character.name,
      collectionName: character.collectionName,
      collectionSubtitle: character.collectionSubtitle,
      thumbnailUrl: character.thumbnailUrl,
      collectedAt: collectedCharacterMeta[id]?.collectedAt ?? null,
    };
  })
  .filter(Boolean);

// GET /api/characters/collected/:characterId 더미 응답
export function getCollectedCharacterById(characterId) {
  if (!collectedCharacterIds.includes(characterId)) return null;

  const character = characterCatalog.find((item) => item.id === characterId);
  if (!character) return null;

  return {
    id: character.id,
    name: character.name,
    collectionName: character.collectionName,
    collectionSubtitle: character.collectionSubtitle,
    thumbnailUrl: character.thumbnailUrl,
    imageUrl: character.imageUrl,
    description: character.description,
    sections: character.sections.map((section) => ({
      type: section.type,
      title: section.title,
      content: section.content ?? '',
    })),
    collectedAt: collectedCharacterMeta[characterId]?.collectedAt ?? null,
  };
}

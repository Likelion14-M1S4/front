import api from './axios';

/**
 * GET /api/stories
 * 현재 시즌 챕터 목록을 unlock_order 순으로 반환.
 * currentSeason은 최근 등록 제품의 캐릭터 기준. 등록 제품 없으면 null.
 */
export async function getStoryChapters() {
  const { data } = await api.get('/api/stories');
  return data.data;
}

/**
 * GET /api/stories/{storyId}
 * 챕터 장면 목록을 순서대로 반환. 잠긴 챕터는 403.
 */
export async function getStoryById(storyId) {
  const { data } = await api.get(`/api/stories/${storyId}`);
  return normalizeStoryDetail(data.data);
}

/**
 * POST /api/stories/{storyId}/complete
 * 마지막 장면까지 본 뒤 완료 버튼(마지막 탭)에서 호출.
 * 시즌 마지막 챕터면 isSeasonCompleted=true 와 캐릭터 정보 반환.
 */
export async function completeChapter(storyId) {
  const { data } = await api.post(`/api/stories/${storyId}/complete`);
  const payload = data.data ?? {};

  return {
    storyId: payload.storyId,
    isDone: payload.isDone,
    readAt: payload.readAt,
    isSeasonCompleted: payload.isSeasonCompleted,
    characterName: payload.characterName,
    characterImgUrl: payload.characterImgUrl,
    charms: Array.isArray(payload.charms) ? payload.charms : [],
  };
}

/** 시즌 참 구매 가능 여부 등에서 쓰는 완료 챕터 id 목록 */
export async function getCompletedChapterIds() {
  const page = await getStoryChapters();
  return (page.currentSeason?.stories ?? [])
    .filter((story) => story.isDone)
    .map((story) => story.id);
}

function normalizeStoryDetail(payload) {
  if (!payload || typeof payload !== 'object') return null;

  const scenes = Array.isArray(payload.scenes)
    ? payload.scenes
    : Array.isArray(payload.slides)
      ? payload.slides
      : [];

  const slides = scenes.map((scene, index) => ({
    id: scene.id ?? index + 1,
    type: scene.type ?? 'normal',
    imageUrl: scene.imgUrl ?? scene.imageUrl ?? '',
    text: scene.text ?? scene.content ?? scene.script ?? '',
  }));

  return {
    id: payload.id,
    title: payload.title ?? payload.name ?? '',
    slides,
  };
}

import api from './axios';

const STORAGE_KEY = 'mcm_story_completed_chapters';

//// 챕터 1에서 2넘어갈때 챕터 1을 다 보고 왔냐를 판단해주는 api

// 백엔드 연동 전까지 localStorage로 완료 상태를 저장. 연동 시 GET/POST 호출만 살리면 됩니다.

/** GET /api/story/progress */
export async function getCompletedChapterIds() {
  // const { data } = await api.get('/story/progress');
  // return data.completedChapterIds;

  const raw = localStorage.getItem(STORAGE_KEY);
  //return Promise.resolve([]); // 전부 잠긴 상태로 강제
  // return Promise.resolve([1]); // 챕터 1만 완료된 상태로 강제
  return Promise.resolve(raw ? JSON.parse(raw) : []);
}

/** POST /api/story/progress { chapterId } */
export async function completeChapter(chapterId) {
  // const { data } = await api.post('/story/progress', { chapterId });
  // return data.completedChapterIds;

  const raw = localStorage.getItem(STORAGE_KEY);
  const ids = raw ? JSON.parse(raw) : [];
  if (!ids.includes(chapterId)) {
    ids.push(chapterId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }
  return Promise.resolve(ids);
}

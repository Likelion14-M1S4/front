import api from './axios';
import { createCharacterTextMessage, createUserImageMessage, createUserTextMessage } from '../mock/chat';

function toApiHistory(history) {
  return history.map((message) => ({
    role: message.role === 'character' ? 'CHARACTER' : 'USER',
    content: message.content,
  }));
}

// 채팅 진입 화면 조회
// GET /api/chat/:characterId/entry
async function getChatEntry(characterId) {
  try {
    const { data } = await api.get(`/api/chat/${characterId}/entry`);
    console.log('[chat] GET entry 응답:', data);
    return data.data;
  } catch (err) {
    if (err.response?.status === 404) return null;
    throw err;
  }
}

// 채팅 세션 시작 (실제로는 세션이 없고, 매번 같은 초기 상태를 반환)
export async function startChatSession(characterId) {
  const entry = await getChatEntry(characterId);
  if (!entry) return null;

  return {
    characterId: entry.characterId,
    characterName: entry.characterName,
    avatarUrl: entry.characterTagUrl,
    quickReplies: entry.starterChoices.map((choice) => ({
      id: choice.id,
      label: choice.label,
      tagName: choice.tagName,
    })),
    messages: [
      createCharacterTextMessage({
        characterName: entry.characterName,
        content: entry.greeting,
      }),
    ],
  };
}

// 메시지 전송 (텍스트)
// POST /api/chat/messages { characterId, message, tagName, history }
// AI 호출 실패는 서버가 고정 대체 문구로 흡수해 항상 200으로 옴 (여기서 별도 처리 불필요)
export async function sendChatMessage({ characterId, characterName, content, history, tagName = 'product' }) {
  const { data } = await api.post('/api/chat/messages', {
    characterId: Number(characterId),
    message: content,
    tagName,
    history: toApiHistory(history),
  });
  console.log('[chat] POST messages 응답:', data);

  const userMessage = createUserTextMessage(content);
  const characterMessage = createCharacterTextMessage({
    characterName,
    content: data.data.reply,
  });

  return { userMessage, characterMessage };
}

// 이미지로 케어 진단 (AI 인스펙터)
// POST /api/chat/inspector?characterId=&history= (multipart/form-data, image)
export async function sendChatImageMessage({ characterId, characterName, imageFile, previewUrl, history }) {
  const formData = new FormData();
  formData.append('image', imageFile);

  const { data } = await api.post('/api/chat/inspector', formData, {
    params: {
      characterId: Number(characterId),
      history: JSON.stringify(toApiHistory(history)),
    },
  });
  console.log('[chat] POST inspector 응답:', data);

  const userMessage = createUserImageMessage(previewUrl);
  const characterMessage = createCharacterTextMessage({
    characterName,
    content: data.data.reply,
  });

  return { userMessage, characterMessage };
}

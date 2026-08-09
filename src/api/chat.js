import api from './axios';
import {
  createCharacterTextMessage,
  createGreetingMessage,
  createUserImageMessage,
  createUserTextMessage,
  DEFAULT_USER_NAME,
  quickReplies,
  resolveMockAiReply,
} from '../mock/chat';
import { getCollectedCharacterById } from '../mock/characters';

// 백엔드·AI 연동 전까지는 mock으로 동작합니다.
// 연동 시 주석 처리된 axios 호출로 교체하면 됩니다.

// 채팅 세션 시작
// POST /api/chat/sessions { characterId }
export async function startChatSession(characterId) {
  // const { data } = await api.post('/chat/sessions', { characterId });
  // return data;

  const character = getCollectedCharacterById(characterId);
  if (!character) {
    return Promise.resolve(null);
  }

  const userName = DEFAULT_USER_NAME;

  return Promise.resolve({
    sessionId: `session-${character.id}`,
    characterId: character.id,
    characterName: character.name,
    avatarUrl: character.thumbnailUrl,
    userName,
    quickReplies,
    messages: [
      createGreetingMessage({
        characterName: character.name,
        userName,
      }),
    ],
  });
}

// 메시지 전송 (텍스트)
// POST /api/chat/sessions/:sessionId/messages { type: 'text', content }
export async function sendChatMessage({ sessionId, characterId, characterName, content }) {
  // const { data } = await api.post(`/chat/sessions/${sessionId}/messages`, {
  //   type: 'text',
  //   content,
  // });
  // return data;

  void sessionId;
  void characterId;

  const userMessage = createUserTextMessage(content);
  const replyContent = resolveMockAiReply(content);
  const characterMessage = createCharacterTextMessage({
    characterName,
    content: replyContent,
  });

  // AI 응답 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 450));

  return Promise.resolve({
    userMessage,
    characterMessage,
  });
}

// 이미지 메시지 전송
// POST /api/chat/sessions/:sessionId/messages { type: 'image', content }
export async function sendChatImageMessage({
  sessionId,
  characterId,
  characterName,
  imageUrl,
}) {
  // const { data } = await api.post(`/chat/sessions/${sessionId}/messages`, {
  //   type: 'image',
  //   content: imageUrl,
  // });
  // return data;

  void sessionId;
  void characterId;

  const userMessage = createUserImageMessage(imageUrl);
  const characterMessage = createCharacterTextMessage({
    characterName,
    content: '사진을 확인해 볼게요. 어떤 부분인지 조금 더 알려주시겠어요?',
  });

  await new Promise((resolve) => setTimeout(resolve, 450));

  return Promise.resolve({
    userMessage,
    characterMessage,
  });
}

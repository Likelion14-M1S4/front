// 챗봇 더미 데이터 / AI 응답 시뮬레이션
// 추후 POST /api/chat/sessions, POST /api/chat/sessions/:id/messages 로 교체

export const DEFAULT_USER_NAME = '00';

export const quickReplies = [
  { id: 'stain', label: '제품이 오염됐어' },
  { id: 'product-info', label: '이 제품에 대해 알려줘' },
  { id: 'about-me', label: '너에 대해 알고싶어' },
];

// 빠른 답변 / 키워드별 AI 응답 mock
export const mockAiReplies = {
  stain: '어떤 이유로 생긴 얼룩인가요?',
  'product-info':
    '이 제품은 MCM의 아이코닉한 비세토스 모노그램으로 제작되어 클래식함과 실용성을 함께 담았습니다.',
  'about-me':
    '저는 독일 뮌헨의 정신을 이어받은 MCM의 상징적인 라이온 캐릭터예요. 천천히, 그리고 편하게 이야기 나눠요.',
  default: '흥미로운 이야기네요. 조금 더 자세히 들려주시겠어요?',
};

export function createGreetingMessage({ characterName, userName }) {
  return {
    id: `msg-greeting-${Date.now()}`,
    role: 'character',
    type: 'text',
    content: `안녕하세요, ${userName}님.\n어떤 얘기를 나눠볼까요?`,
    characterName,
    createdAt: new Date().toISOString(),
  };
}

export function createUserTextMessage(content) {
  return {
    id: `msg-user-${Date.now()}`,
    role: 'user',
    type: 'text',
    content,
    createdAt: new Date().toISOString(),
  };
}

export function createUserImageMessage(imageUrl) {
  return {
    id: `msg-user-image-${Date.now()}`,
    role: 'user',
    type: 'image',
    content: imageUrl,
    createdAt: new Date().toISOString(),
  };
}

export function createCharacterTextMessage({ characterName, content }) {
  return {
    id: `msg-character-${Date.now()}`,
    role: 'character',
    type: 'text',
    content,
    characterName,
    createdAt: new Date().toISOString(),
  };
}

export function resolveMockAiReply(input) {
  const text = input.trim();

  const matchedQuickReply = quickReplies.find((item) => item.label === text);
  if (matchedQuickReply) {
    return mockAiReplies[matchedQuickReply.id] ?? mockAiReplies.default;
  }

  if (text.includes('얼룩') || text.includes('오염')) {
    return mockAiReplies.stain;
  }

  return mockAiReplies.default;
}

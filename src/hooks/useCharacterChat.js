import { useCallback, useEffect, useState } from 'react';
import {
  sendChatImageMessage,
  sendChatMessage,
  startChatSession,
} from '../api/chat';

// 캐릭터 챗봇 세션/메시지 상태를 관리하는 훅
export function useCharacterChat(characterId) {
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!characterId) return undefined;

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    startChatSession(characterId)
      .then((data) => {
        if (!isMounted) return;
        if (!data) {
          setError(new Error('NOT_FOUND'));
          setSession(null);
          setMessages([]);
          return;
        }
        setSession(data);
        setMessages(data.messages ?? []);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [characterId]);

  const sendText = useCallback(
    async (content) => {
      if (!session || !content.trim() || isSending) return;

      setIsSending(true);
      try {
        const { userMessage, characterMessage } = await sendChatMessage({
          sessionId: session.sessionId,
          characterId: session.characterId,
          characterName: session.characterName,
          content: content.trim(),
        });

        setMessages((prev) => [...prev, userMessage, characterMessage]);
      } finally {
        setIsSending(false);
      }
    },
    [session, isSending],
  );

  const sendImage = useCallback(
    async (imageUrl) => {
      if (!session || !imageUrl || isSending) return;

      setIsSending(true);
      try {
        const { userMessage, characterMessage } = await sendChatImageMessage({
          sessionId: session.sessionId,
          characterId: session.characterId,
          characterName: session.characterName,
          imageUrl,
        });

        setMessages((prev) => [...prev, userMessage, characterMessage]);
      } finally {
        setIsSending(false);
      }
    },
    [session, isSending],
  );

  return {
    session,
    messages,
    isLoading,
    isSending,
    error,
    sendText,
    sendImage,
  };
}

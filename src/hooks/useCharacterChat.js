import { useCallback, useEffect, useState } from 'react';
import {
  sendChatImageMessage,
  sendChatMessage,
  startChatSession,
} from '../api/chat';
import { createCharacterTextMessage, createUserImageMessage, createUserTextMessage } from '../mock/chat';

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
    async (content, tagName) => {
      if (!session || !content.trim() || isSending) return;

      setIsSending(true);
      try {
        const { userMessage, characterMessage } = await sendChatMessage({
          characterId: session.characterId,
          characterName: session.characterName,
          content: content.trim(),
          history: messages.filter((message) => message.type === 'text'),
          tagName,
        });

        setMessages((prev) => [...prev, userMessage, characterMessage]);
      } catch (err) {
        const userMessage = createUserTextMessage(content.trim());
        const errorMessage = createCharacterTextMessage({
          characterName: session.characterName,
          content: err.response?.data?.message ?? '메시지를 보내지 못했어요. 다시 시도해주세요.',
        });
        setMessages((prev) => [...prev, userMessage, errorMessage]);
      } finally {
        setIsSending(false);
      }
    },
    [session, isSending, messages],
  );

  const sendImage = useCallback(
    async (imageFile) => {
      if (!session || !imageFile || isSending) return;

      const previewUrl = URL.createObjectURL(imageFile);
      setIsSending(true);
      try {
        const { userMessage, characterMessage } = await sendChatImageMessage({
          characterId: session.characterId,
          characterName: session.characterName,
          imageFile,
          previewUrl,
          history: messages.filter((message) => message.type === 'text'),
        });

        setMessages((prev) => [...prev, userMessage, characterMessage]);
      } catch (err) {
        const userMessage = createUserImageMessage(previewUrl);
        const errorMessage = createCharacterTextMessage({
          characterName: session.characterName,
          content: err.response?.data?.message ?? '사진을 확인하지 못했어요. 다시 시도해주세요.',
        });
        setMessages((prev) => [...prev, userMessage, errorMessage]);
      } finally {
        setIsSending(false);
      }
    },
    [session, isSending, messages],
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

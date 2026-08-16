import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BackHeader from '../../components/common/Header/BackHeader';
import cameraIcon from '../../assets/icons/nav/camera.svg';
import sendIcon from '../../assets/icons/nav/vector.svg';
import { useCharacterChat } from '../../hooks/useCharacterChat';

const Page = styled.div`
  display: flex;
  height: 100%;
  min-height: 100%;
  flex-direction: column;
  background: #ffffff;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1rem 0.75rem;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CharacterRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  background: #f2f2f2;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CharacterBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  max-width: 78%;
`;

const CharacterName = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #000000;
`;

const CharacterBubble = styled.div`
  padding: 0.75rem 0.875rem;
  border-radius: 12px;
  background: #fffaf5;
  font-size: 0.875rem;
  line-height: 1.55;
  color: #333333;
  white-space: pre-line;
`;

const UserRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const UserBubble = styled.div`
  max-width: 78%;
  padding: 0.75rem 0.875rem;
  border-radius: 12px;
  background: #000000;
  font-size: 0.875rem;
  line-height: 1.55;
  color: #ffffff;
  white-space: pre-line;
`;

const UserImage = styled.div`
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 12px;
  overflow: hidden;
  background: #f2f2f2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Composer = styled.div`
  flex-shrink: 0;
  border-top: 1px solid #e8e2dc;
  background: #ffffff;
`;

const SheetHandle = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.625rem;
`;

const HandleBar = styled.span`
  width: 2.25rem;
  height: 0.1875rem;
  border-radius: 9999px;
  background: #d9d2cb;
`;

const QuickReplies = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 0.875rem 1rem 0.5rem;
`;

const QuickReplyButton = styled.button`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e5e0da;
  border-radius: 12px;
  background: #ffffff;
  font-size: 0.875rem;
  color: #333333;
  text-align: center;

  &:disabled {
    opacity: 0.6;
  }
`;

const InputBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.875rem calc(0.625rem + env(safe-area-inset-bottom, 0px));
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;

  img {
    display: block;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const TextInput = styled.input`
  flex: 1;
  height: 2.5rem;
  border: none;
  border-radius: 9999px;
  background: #f2f2f2;
  padding: 0 1rem;
  font-size: 0.875rem;
  color: #000000;
  outline: none;

  &::placeholder {
    color: #b0a69c;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const Status = styled.p`
  margin: 2.5rem 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: #8a7a6c;
`;

// 캐릭터 챗봇 페이지 (추후 AI API 연동)
function CharacterChat() {
  const { characterId } = useParams();
  const { session, messages, isLoading, isSending, error, sendText, sendImage } =
    useCharacterChat(characterId);

  const [input, setInput] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const listRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isSending]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isSending) return;
    setInput('');
    setShowQuickReplies(false);
    await sendText(text);
  };

  const handleQuickReply = async (choice) => {
    if (isSending) return;
    setShowQuickReplies(false);
    await sendText(choice.label, choice.tagName);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setShowQuickReplies(false);
    await sendImage(file);
  };

  if (isLoading) {
    return (
      <Page>
        <BackHeader />
        <Status>대화를 준비하는 중...</Status>
      </Page>
    );
  }

  if (error || !session) {
    return (
      <Page>
        <BackHeader />
        <Status>채팅을 시작할 수 없습니다.</Status>
      </Page>
    );
  }

  return (
    <Page>
      <BackHeader />

      <MessageList ref={listRef}>
        {messages.map((message) => {
          if (message.role === 'character') {
            return (
              <CharacterRow key={message.id}>
                <Avatar>
                  {session.avatarUrl ? (
                    <img src={session.avatarUrl} alt={session.characterName} />
                  ) : null}
                </Avatar>
                <CharacterBody>
                  <CharacterName>{message.characterName ?? session.characterName}</CharacterName>
                  <CharacterBubble>{message.content}</CharacterBubble>
                </CharacterBody>
              </CharacterRow>
            );
          }

          if (message.type === 'image') {
            return (
              <UserRow key={message.id}>
                <UserImage>
                  <img src={message.content} alt="업로드한 이미지" />
                </UserImage>
              </UserRow>
            );
          }

          return (
            <UserRow key={message.id}>
              <UserBubble>{message.content}</UserBubble>
            </UserRow>
          );
        })}
      </MessageList>

      <Composer>
        {showQuickReplies && messages.length <= 1 ? (
          <>
            <SheetHandle>
              <HandleBar />
            </SheetHandle>
            <QuickReplies>
              {session.quickReplies.map((item) => (
                <QuickReplyButton
                  key={item.id}
                  type="button"
                  disabled={isSending}
                  onClick={() => handleQuickReply(item)}
                >
                  {item.label}
                </QuickReplyButton>
              ))}
            </QuickReplies>
          </>
        ) : null}

        <InputBar>
          <IconButton
            type="button"
            aria-label="사진 첨부"
            onClick={handlePickImage}
            disabled={isSending}
          >
            <img src={cameraIcon} alt="" width={26} height={22} />
          </IconButton>

          <TextInput
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowQuickReplies(false)}
            disabled={isSending}
          />

          <IconButton
            type="button"
            aria-label="전송"
            onClick={handleSend}
            disabled={isSending || !input.trim()}
          >
            <img src={sendIcon} alt="" width={18} height={16} />
          </IconButton>
        </InputBar>

        <HiddenFileInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Composer>
    </Page>
  );
}

export default CharacterChat;

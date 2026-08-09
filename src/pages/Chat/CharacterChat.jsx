import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
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

const TopBar = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 12px;
  border-bottom: 1px solid #e8e2dc;
  flex-shrink: 0;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  font-size: 28px;
  line-height: 1;
  color: #6f5b4d;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 16px 12px;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CharacterRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 16px;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
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
  gap: 6px;
  max-width: 78%;
`;

const CharacterName = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: #000000;
`;

const CharacterBubble = styled.div`
  padding: 12px 14px;
  border-radius: 12px;
  background: #fffaf5;
  font-size: 14px;
  line-height: 1.55;
  color: #333333;
  white-space: pre-line;
`;

const UserRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

const UserBubble = styled.div`
  max-width: 78%;
  padding: 12px 14px;
  border-radius: 12px;
  background: #000000;
  font-size: 14px;
  line-height: 1.55;
  color: #ffffff;
  white-space: pre-line;
`;

const UserImage = styled.div`
  width: 180px;
  height: 180px;
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
  padding-top: 10px;
`;

const HandleBar = styled.span`
  width: 36px;
  height: 3px;
  border-radius: 9999px;
  background: #d9d2cb;
`;

const QuickReplies = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px 8px;
`;

const QuickReplyButton = styled.button`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e5e0da;
  border-radius: 12px;
  background: #ffffff;
  font-size: 14px;
  color: #333333;
  text-align: center;

  &:disabled {
    opacity: 0.6;
  }
`;

const InputBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px calc(10px + env(safe-area-inset-bottom, 0px));
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
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
  height: 40px;
  border: none;
  border-radius: 9999px;
  background: #f2f2f2;
  padding: 0 16px;
  font-size: 14px;
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
  margin: 40px 16px;
  text-align: center;
  font-size: 14px;
  color: #8a7a6c;
`;

// 캐릭터 챗봇 페이지 (추후 AI API 연동)
function CharacterChat() {
  const { characterId } = useParams();
  const navigate = useNavigate();
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

  const handleQuickReply = async (label) => {
    if (isSending) return;
    setShowQuickReplies(false);
    await sendText(label);
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

    const imageUrl = URL.createObjectURL(file);
    setShowQuickReplies(false);
    await sendImage(imageUrl);
  };

  if (isLoading) {
    return (
      <Page>
        <TopBar>
          <BackButton type="button" aria-label="뒤로가기" onClick={() => navigate(-1)}>
            ‹
          </BackButton>
        </TopBar>
        <Status>대화를 준비하는 중...</Status>
      </Page>
    );
  }

  if (error || !session) {
    return (
      <Page>
        <TopBar>
          <BackButton type="button" aria-label="뒤로가기" onClick={() => navigate(-1)}>
            ‹
          </BackButton>
        </TopBar>
        <Status>채팅을 시작할 수 없습니다.</Status>
      </Page>
    );
  }

  return (
    <Page>
      <TopBar>
        <BackButton type="button" aria-label="뒤로가기" onClick={() => navigate(-1)}>
          ‹
        </BackButton>
      </TopBar>

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
                  onClick={() => handleQuickReply(item.label)}
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

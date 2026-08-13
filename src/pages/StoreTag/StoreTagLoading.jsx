import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import mcmLogo from '../../assets/icons/nav/header/mcm.svg';
import pointLarge from '../../assets/icons/tag/point 1.svg';
import pointMedium from '../../assets/icons/tag/point 2.svg';
import pointSmall from '../../assets/icons/tag/point 3.svg';
import { useStoreTagNfc } from '../../hooks/useStoreTagNfc';
import { useAuth } from '../../context/AuthContext';
import { APP_WIDTH } from '../../styles/theme';

const L = pointLarge;
const M = pointMedium;
const S = pointSmall;

// 제공된 4프레임을 순서대로 무한 반복 (API 연결될 때까지)
const DOT_FRAMES = [
  [L, M, S],
  [M, L, S],
  [S, M, L],
  [L, S, M],
];

const FRAME_MS = 380;

// 이 값이 세션에 있으면 이미 한 번 NFC를 읽은 것으로 보고 로딩 화면을 건너뜀
const NFC_READ_KEY = 'mcm_store_tag_nfc_read';

const Page = styled.div`
  display: flex;
  width: 100%;
  max-width: ${APP_WIDTH}px;
  min-height: 100%;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: #f9f6f2;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -48px;
`;

const Logo = styled.img`
  width: 72px;
  height: 72px;
  object-fit: contain;
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 36px;
  min-height: 16px;
`;

const Dot = styled.img`
  display: block;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
`;

const Message = styled.p`
  margin: 28px 0 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  color: #000000;
  text-align: center;
`;

const ErrorMessage = styled.p`
  margin: 16px 20px 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #8a7a6c;
  text-align: center;
`;

const RetryButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: 1px solid #1a1a1a;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  cursor: pointer;
`;

function getDotSize(src) {
  if (src === L) return 16;
  if (src === M) return 12;
  return 8;
}

// 매장 태그 로딩 — NFC API 연결될 때까지 유지
function StoreTagLoading() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [frameIndex, setFrameIndex] = useState(0);
  const [requestKey, setRequestKey] = useState(0);
  // 이번 세션에 이미 한 번 읽었으면 다시 읽지 않고, 로그인 여부에 따라 바로 이동
  const alreadyRead = sessionStorage.getItem(NFC_READ_KEY) === 'true';
  const { result, isLoading, error } = useStoreTagNfc({ requestKey, skip: alreadyRead });

  useEffect(() => {
    if (alreadyRead) navigate(isLoggedIn ? '/home' : '/certificate', { replace: true });
  }, [alreadyRead, isLoggedIn, navigate]);

  // 점 애니메이션: 로딩 중 무한 루프 (2번 후 종료하지 않음)
  useEffect(() => {
    if (!isLoading) return undefined;

    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % DOT_FRAMES.length);
    }, FRAME_MS);

    return () => clearInterval(timer);
  }, [isLoading]);

  // 연결 성공 시 세션에 기록 후 정품인증 화면으로 이동 (다음 방문부터는 로딩 화면 생략)
  useEffect(() => {
    if (!result || isLoading) return;
    sessionStorage.setItem(NFC_READ_KEY, 'true');
    navigate(isLoggedIn ? result.nextPath || '/home' : '/certificate', { replace: true });
  }, [result, isLoading, isLoggedIn, navigate]);

  const dots = DOT_FRAMES[frameIndex];

  return (
    <Page>
      <Content>
        <Logo src={mcmLogo} alt="MCM" />
        <Dots aria-hidden>
          {dots.map((src, index) => (
            <Dot
              key={`${frameIndex}-${index}`}
              src={src}
              alt=""
              $size={getDotSize(src)}
            />
          ))}
        </Dots>
        <Message>NFC 정보를 읽어오는 중입니다.</Message>
        {error ? (
          <>
            <ErrorMessage>NFC 정보를 읽지 못했습니다.</ErrorMessage>
            <RetryButton
              type="button"
              onClick={() => setRequestKey((key) => key + 1)}
            >
              다시 시도
            </RetryButton>
          </>
        ) : null}
      </Content>
    </Page>
  );
}

export default StoreTagLoading;

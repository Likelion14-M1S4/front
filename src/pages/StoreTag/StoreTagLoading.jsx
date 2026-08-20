import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import mcmLogo from '../../assets/icons/nav/header/mcm.svg';
import pointLarge from '../../assets/icons/tag/point 1.svg';
import pointMedium from '../../assets/icons/tag/point 2.svg';
import pointSmall from '../../assets/icons/tag/point 3.svg';
import { useStoreTagNfc } from '../../hooks/useStoreTagNfc';
import { useAuth } from '../../context/AuthContext';
import { APP_MAX_WIDTH_REM } from '../../styles/theme';
import { NFC_READ_KEY, NFC_UID_KEY, NFC_CHARACTER_KEY } from '../../constants/storeTagSession';

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

const Page = styled.div`
  display: flex;
  width: 100%;
  max-width: ${APP_MAX_WIDTH_REM}rem;
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
  margin-top: -3rem;
`;

const Logo = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  object-fit: contain;
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  margin-top: 2.25rem;
  min-height: 1rem;
`;

const Dot = styled.img`
  display: block;
  width: ${({ $size }) => $size}rem;
  height: ${({ $size }) => $size}rem;
`;

const Message = styled.p`
  margin: 1.75rem 0 0;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
  color: #000000;
  text-align: center;
`;

const ErrorMessage = styled.p`
  margin: 1rem 1.25rem 0;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #8a7a6c;
  text-align: center;
`;

const RetryButton = styled.button`
  margin-top: 1.25rem;
  padding: 0.625rem 1.25rem;
  border: 1px solid #1a1a1a;
  background: transparent;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1a1a1a;
  cursor: pointer;
`;

function getDotSize(src) {
  if (src === L) return 1;
  if (src === M) return 0.75;
  return 0.5;
}

// 매장 태그 로딩 — NFC API 연결될 때까지 유지
function StoreTagLoading() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [frameIndex, setFrameIndex] = useState(0);
  const [requestKey, setRequestKey] = useState(0);

  // 실물 NFC 태그는 태그를 찍으면 uid를 URL 쿼리스트링(?uid=...)에 담아 이 화면을 엽니다.
  const uid = new URLSearchParams(window.location.search).get('uid');

  // 실물 NFC 태그가 아직 없어 테스트용 uid를 고정으로 사용합니다.
  // 실물 NFC 연동 시 위 줄의 주석을 풀고 아래 줄은 지우세요.
  // const uid = 'NFC-0000-0002';

  // 이번 세션에 이미 한 번 읽었으면 다시 읽지 않고, 로그인 여부에 따라 바로 이동
  const alreadyRead = sessionStorage.getItem(NFC_READ_KEY) === 'true';
  const { result, isLoading, error } = useStoreTagNfc({ uid, requestKey, skip: alreadyRead });

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
  // uid·character는 세션에 저장해 정품 인증서·캐릭터 컬렉션 추가 화면에서 그대로 사용합니다.
  useEffect(() => {
    if (!result || isLoading) return;
    sessionStorage.setItem(NFC_READ_KEY, 'true');
    sessionStorage.setItem(NFC_UID_KEY, uid);
    if (result.character) {
      sessionStorage.setItem(NFC_CHARACTER_KEY, JSON.stringify(result.character));
    } else {
      sessionStorage.removeItem(NFC_CHARACTER_KEY);
    }
    navigate(isLoggedIn ? '/home' : '/certificate', { replace: true });
  }, [result, isLoading, isLoggedIn, navigate, uid]);

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

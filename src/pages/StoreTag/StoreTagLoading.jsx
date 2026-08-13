import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import mcmLogo from '../../assets/icons/nav/header/mcm.svg';
import pointLarge from '../../assets/icons/tag/point 1.svg';
import pointMedium from '../../assets/icons/tag/point 2.svg';
import pointSmall from '../../assets/icons/tag/point 3.svg';
import { useStoreTagNfc } from '../../hooks/useStoreTagNfc';
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
  const [frameIndex, setFrameIndex] = useState(0);
  const [requestKey, setRequestKey] = useState(0);
  const { result, isLoading, error } = useStoreTagNfc({ requestKey });

  // 점 애니메이션: 로딩 중 무한 루프 (2번 후 종료하지 않음)
  useEffect(() => {
    if (!isLoading) return undefined;

    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % DOT_FRAMES.length);
    }, FRAME_MS);

    return () => clearInterval(timer);
  }, [isLoading]);

  // 연결 성공 시 이동
  useEffect(() => {
    if (!result || isLoading) return;
    navigate(result.nextPath || '/home', { replace: true });
  }, [result, isLoading, navigate]);

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

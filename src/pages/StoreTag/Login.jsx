import styled from 'styled-components';
import { useLocation, useSearchParams } from 'react-router-dom';
import mcmLogo from '../../assets/icons/nav/header/mcm.svg';
import kakaoIcon from '../../assets/icons/nav/kakaotalk_icon.svg';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 0 1.5rem;
  background: #FFFAF5;
`;

// 로고
const Logo = styled.img`
  width: 3.5625rem;
  height: 3.5625rem;
  margin-top: 13.75rem;
`;

// "로그인" 타이틀
const Title = styled.h1`
  margin: 2.75rem 0 0;
  color: black;
  font-size: 2rem;
  font-family: 'Pretendard';
  font-weight: 400;
`;

// 카카오 로그인 버튼
const KakaoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.375rem;
  width: 100%;
  height: 3.5rem;
  margin-top: 1.75rem;
  border-radius: 0.3125rem;
  border: none;
  background: #000000;
  cursor: pointer;
`;

const KakaoIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const KakaoText = styled.span`
  color: white;
  font-size: 1.25rem;
  font-family: 'Pretendard';
  font-weight: 500;
`;

const ErrorText = styled.p`
  margin-top: 1rem;
  color: #e33;
  font-size: 0.875rem;
  font-family: 'Pretendard';
`;

// 로그인 페이지
function Login() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  // 백엔드 리다이렉트 실패 시 ?error= 쿼리로, 프론트 내부 판단(토큰 누락 등) 실패 시 router state로 전달됨
  const error = searchParams.get('error') ?? location.state?.error ?? '';

  // 백엔드가 카카오 인가부터 토큰 발급까지 전부 처리 — 백엔드 authorize 엔드포인트로 전체 리다이렉트
  const handleKakaoLogin = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';
    window.location.href = `${baseUrl}/api/auth/kakao/authorize?redirect=${window.location.origin}`;
  };

  return (
    <Page>
      <Logo src={mcmLogo} alt="MCM" />
      <Title>로그인</Title>

      <KakaoButton type="button" onClick={handleKakaoLogin}>
        <KakaoIcon src={kakaoIcon} alt="" aria-hidden />
        <KakaoText>Kakao 로그인</KakaoText>
      </KakaoButton>

      {error && <ErrorText role="alert">{error}</ErrorText>}
    </Page>
  );
}

export default Login;
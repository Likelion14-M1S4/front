import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import mcmLogo from '../../assets/icons/nav/header/mcm.svg';
import kakaoIcon from '../../assets/icons/nav/kakaotalk_icon.svg';
import { KAKAO_REDIRECT_URI } from '../../lib/kakao';

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
  font-family: 'SD Minburi';
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
  font-family: 'SD Minburi';
  font-weight: 500;
`;

const ErrorText = styled.p`
  margin-top: 1rem;
  color: #e33;
  font-size: 0.875rem;
`;

// 로그인 페이지
function Login() {
  const location = useLocation();
  const [error, setError] = useState(location.state?.error ?? '');

  // 카카오 로그인 페이지로 전체 리다이렉트 — 결과(code)는 /oauth/kakao에서 처리
  const handleKakaoLogin = () => {
    if (!window.Kakao?.isInitialized()) {
      setError('카카오 로그인을 사용할 수 없습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    window.Kakao.Auth.authorize({ redirectUri: KAKAO_REDIRECT_URI });
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
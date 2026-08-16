import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import mcmLogo from '../../assets/icons/nav/header/mcm.svg';
import kakaoIcon from '../../assets/icons/nav/kakaotalk_icon.svg';
import { useAuth } from '../../context/AuthContext';    //api 연동 전 로그인 확인 위함

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

// 로그인 페이지
function Login() {
  const { login } = useAuth()
  const navigate = useNavigate();
  // 카카오 로그인 처리 (추후 API 연동)
  const handleKakaoLogin = () => {
    login(); // 시연용: 로그인 상태로 전환 (추후 실제 카카오 API로 교체)
    navigate('/home', { replace: true });
  };

  return (
    <Page>
      <Logo src={mcmLogo} alt="MCM" />
      <Title>로그인</Title>

      <KakaoButton type="button" onClick={handleKakaoLogin}>
        <KakaoIcon src={kakaoIcon} alt="" aria-hidden />
        <KakaoText>Kakao 로그인</KakaoText>
      </KakaoButton>
    </Page>
  );
}

export default Login;
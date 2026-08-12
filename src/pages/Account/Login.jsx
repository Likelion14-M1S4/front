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
  padding: 0 24px;
  background: #FFFAF5;
`;

// 로고
const Logo = styled.img`
  width: 57px;
  height: 57px;
  margin-top: 220px;
`;

// "로그인" 타이틀
const Title = styled.h1`
  margin: 44px 0 0;
  color: black;
  font-size: 32px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

// 카카오 로그인 버튼
const KakaoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  width: 100%;
  height: 56px;
  margin-top: 28px;
  border: none;
  background: #191919;
  cursor: pointer;
`;

const KakaoIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const KakaoText = styled.span`
  color: white;
  font-size: 20px;
  font-family: 'SD Minburi';
  font-weight: 500;
`;

// 로그인 페이지
function Login() {
  const { login } = useAuth()
  const navigate = useNavigate();
  // 카카오 로그인 처리 (추후 API 연동)
  const handleKakaoLogin = () => {
    login(); // 시연용: 로그인 상태로 전환 (추후 실제 카카오 API로 교체)
    navigate('/');
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
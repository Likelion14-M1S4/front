import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-size: 1rem;
  font-family: 'Pretendard';
  color: #1a1a1a;
`;

// 백엔드가 카카오 로그인 처리를 끝내고 돌아오는 곳
// 성공: {origin}/oauth/kakao#accessToken=...&refreshToken=...&isNewUser=...
function KakaoCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const params = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (!accessToken || !refreshToken) {
      navigate('/login', { replace: true, state: { error: '로그인에 실패했습니다.' } });
      return;
    }

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    login();
    navigate('/home', { replace: true });
  }, [navigate, login]);

  return <Page>로그인 처리 중...</Page>;
}

export default KakaoCallback;

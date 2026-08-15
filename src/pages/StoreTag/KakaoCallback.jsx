import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { kakaoLogin } from '../../api/auth';
import { KAKAO_REDIRECT_URI } from '../../lib/kakao';
import { useAuth } from '../../context/AuthContext';

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

// 카카오 authorize() 리다이렉트가 돌아오는 곳 — ?code를 받아 백엔드로 전달
function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const code = searchParams.get('code');
    if (!code) {
      navigate('/login', { replace: true, state: { error: '카카오 로그인이 취소되었습니다.' } });
      return;
    }

    kakaoLogin(code, KAKAO_REDIRECT_URI)
      .then(() => {
        login();
        navigate('/home', { replace: true });
      })
      .catch((err) => {
        navigate('/login', {
          replace: true,
          state: { error: err.response?.data?.message ?? '로그인에 실패했습니다.' },
        });
      });
  }, [searchParams, navigate, login]);

  return <Page>로그인 처리 중...</Page>;
}

export default KakaoCallback;

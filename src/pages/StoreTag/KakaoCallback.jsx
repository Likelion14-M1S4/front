import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { addCharacterToCollection } from '../../api/tagCharacterAdd';
import { readStoreTagNfc } from '../../api/storeTagNfc';
import { NFC_READ_KEY, NFC_UID_KEY, NFC_CHARACTER_KEY } from '../../constants/storeTagSession';

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

    // NFC 태그로 확인했지만 로그인 전이라 컬렉션에 담지 못했던 캐릭터가 있으면 로그인 완료 시점에 수집 처리
    const pendingCharacter = sessionStorage.getItem(NFC_CHARACTER_KEY);
    const collect = pendingCharacter
      ? addCharacterToCollection(JSON.parse(pendingCharacter).id).catch(() => {})
      : Promise.resolve();

    // 매장 태그 방문 이력도 같은 이유(로그인 전 verify 호출)로 계정에 안 붙어있을 수 있어,
    // 로그인된 상태로 같은 uid를 한 번 더 검증해 이력이 계정에 연결되도록 시도한다.
    const pendingUid = sessionStorage.getItem(NFC_UID_KEY);
    const relinkVisit = pendingUid ? readStoreTagNfc(pendingUid).catch(() => {}) : Promise.resolve();

    Promise.allSettled([collect, relinkVisit]).finally(() => {
      // 매장 태그 온보딩(NFC 읽음 → 인증서 → 캐릭터 추가)이 로그인으로 끝났으니,
      // 다음에 "/"로 오면 새로 읽은 것처럼 동작하도록 세션 플래그를 전부 정리한다.
      sessionStorage.removeItem(NFC_READ_KEY);
      sessionStorage.removeItem(NFC_UID_KEY);
      sessionStorage.removeItem(NFC_CHARACTER_KEY);
      navigate('/home', { replace: true });
    });
  }, [navigate, login]);

  return <Page>로그인 처리 중...</Page>;
}

export default KakaoCallback;

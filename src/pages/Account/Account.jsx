import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';  //api 연동 전 로그인 확인 위함
import Login from './Login';

const Page = styled.div`
  padding: 24px 20px 40px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
`;

// 내계정 페이지 — 로그인 상태에 따라 분기
function Account() {
  const { isLoggedIn } = useAuth();

  // 로그인 안 되어 있으면 로그인 페이지 표시
  if (!isLoggedIn) {
    return <Login />;
  }

  // 로그인 되어 있으면 마이페이지 내용 표시
  return (
    <Page>
      <Title>내계정</Title>
      {/* 여기에 마이페이지 내용 채우기 */}
    </Page>
  );
}

export default Account;
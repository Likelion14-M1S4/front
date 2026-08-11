import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';  //api 연동 전 로그인 확인 위함
import Login from './Login';
import { accountSections } from '../../mock/account';
import forwardArrow from '../../assets/icons/nav/forward_arrow.svg';

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

// 환영 문구 박스
const WelcomeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 105px;
  background: #f6f4f2;
`;

const WelcomeText = styled.p`
  margin: 0;
  color: black;
  font-size: 24px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

// 위시리스트 (단독 항목) — 좌우 20px 여백
const WishlistRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 40px);
  margin: 0 20px;
  padding: 24px 0 27px;
  border: none;
  border-bottom: 1px solid #000000;
  background: none;
  cursor: pointer;
`;

const WishlistLabel = styled.span`
  color: black;
  font-size: 20px;
  font-family: 'SD Minburi';
  font-weight: 500;
`;

// 섹션 (내 정보 / 시즌 한정 참 / 설정 / 계정 관리) — 좌우 20px
const Section = styled.section`
  padding: 0 20px;
  margin-top: 48px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 12px;
  padding: 0 0 12px 16px;
  color: black;
  font-size: 20px;
  font-family: 'SD Minburi';
  font-weight: 500;
  border-bottom: 1px solid #000000;
`;

// 섹션 내 항목 — 줄 전체 버튼, 텍스트는 왼쪽 16px 들어감
const ItemRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0 10px 16px;
  margin-bottom: 20px;
  border: none;
  background: none;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemLabel = styled.span`
  color: black;
  font-size: 16px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

const Arrow = styled.img`
  width: 8px;
  height: 14px;
`;

// 내계정 페이지 — 로그인 상태에 따라 분기
function Account() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // 로그인 안 되어 있으면 로그인 페이지 표시
  if (!isLoggedIn) {
    return <Login />;
  }

  // 항목 클릭 — url 있으면 외부 링크, id에 따라 페이지 이동
  const handleItemClick = (item) => {
    // 외부 링크가 있는 항목 (약관 등)
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
      return;
    }

    // id별 페이지 이동 (하나씩 연결)
    switch (item.id) {
      case 'wishlist':
        // TODO: navigate('/wishlist');
        break;
      case 'login-info':
        navigate('/account/login-info');
        break;
      case 'registered-product':
        // TODO: navigate('/account/products');
        break;
      case 'store-tag-history':
        // TODO: navigate('/account/tag-history');
        break;
      case 'logout':
        // TODO: logout();
        break;
      default:
        break;
    }
  };

  // 로그인 되어 있으면 마이페이지 내용 표시
  return (
    <Page>
      {/* 환영 문구 — TODO: 연동 시 user.name으로 교체 */}
      <WelcomeBox>
        <WelcomeText>000님 환영합니다.</WelcomeText>
      </WelcomeBox>

      {/* 위시리스트 */}
      <WishlistRow type="button" onClick={() => handleItemClick({ id: 'wishlist' })}>
        <WishlistLabel>위시리스트</WishlistLabel>
        <Arrow src={forwardArrow} alt="" aria-hidden />
      </WishlistRow>

      {/* 섹션들 (내 정보 / 시즌 한정 참 / 설정 / 계정 관리) */}
      {accountSections.map((section) => (
        <Section key={section.id}>
          <SectionTitle>{section.title}</SectionTitle>
          {section.items.map((item) => (
            <ItemRow
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item)}
            >
              <ItemLabel>{item.label}</ItemLabel>
              <Arrow src={forwardArrow} alt="" aria-hidden />
            </ItemRow>
          ))}
        </Section>
      ))}
    </Page>
  );
}

export default Account;
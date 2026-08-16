import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { accountSections } from '../../mock/account';
import forwardArrow from '../../assets/icons/nav/forward_arrow.svg';
import { useMyInfo } from '../../hooks/useMyInfo';

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

// 환영 문구 박스 — 프레임 폭에 맞춰 늘어나도록 width는 100%로 채움
const WelcomeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 11.6875rem;
  background: #f6f4f2;
`;

const WelcomeText = styled.p`
  margin: 0;
  color: black;
  font-size: 1.5rem;
  font-family: 'SD Minburi';
  font-weight: 400;
  text-align: center;
`;

// 위시리스트 (단독 항목) — 좌우 1.25rem 여백
const WishlistRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 2.5rem);
  margin: 0 1.25rem;
  padding: 1.5rem 0 1.6875rem;
  border: none;
  border-bottom: 1px solid #000000;
  background: none;
  cursor: pointer;
`;

const WishlistLabel = styled.span`
  color: black;
  font-size: 1.25rem;
  font-family: 'SD Minburi';
  font-weight: 500;
`;

// 섹션 (내 정보 / 시즌 한정 참 / 설정 / 계정 관리) — 좌우 1.25rem
const Section = styled.section`
  padding: 0 1.25rem;
  margin-top: 3rem;
`;

const SectionTitle = styled.h2`
  margin: 0 0 0.75rem;
  padding: 0 0 0.75rem 1rem;
  color: black;
  font-size: 1.25rem;
  font-family: 'SD Minburi';
  font-weight: 500;
  border-bottom: 1px solid #000000;
`;

// 섹션 내 항목 — 줄 전체 버튼, 텍스트는 왼쪽 1rem 들어감
const ItemRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.625rem 0 0.625rem 1rem;
  margin-bottom: 1.25rem;
  border: none;
  background: none;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemLabel = styled.span`
  color: black;
  font-size: 1rem;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

const Arrow = styled.img`
  width: 0.5rem;
  height: 0.875rem;
`;

// 내계정 페이지 — 로그인 상태에 따라 분기
function Account() {
  const navigate = useNavigate();
  const { myInfo, error } = useMyInfo();

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
        navigate('/wishlist');
        break;
      case 'registered-product':
        navigate('/account/products');
        break;
      case 'store-tag-history':
        navigate('/account/tag-history');
        break;
      case 'available-charm':
        navigate('/account/available-charms');
        break;
      case 'owned-charm':
        navigate('/account/owned-charms');
        break;
      case 'privacy':
        navigate('/account/privacy');
        break;
      case 'terms':
        navigate('/account/terms');
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
      <WelcomeBox>
        <WelcomeText>
          {myInfo?.email ?? '000'}님
          <br />
          환영합니다.
        </WelcomeText>
      </WelcomeBox>
      {error && <WelcomeText>내 정보를 불러오지 못했습니다. ({error.response?.status ?? error.message})</WelcomeText>}

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
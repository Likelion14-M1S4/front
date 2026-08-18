import { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { accountSections } from '../../mock/account';
import forwardArrow from '../../assets/icons/nav/forward_arrow.svg';
import xIcon from '../../assets/icons/nav/Xicon.svg';
import { useMyInfo } from '../../hooks/useMyInfo';
import { useAuth } from '../../context/AuthContext';

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
  font-family: 'Pretendard';
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
  font-family: 'Pretendard';
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
  font-family: 'Pretendard';
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
  font-family: 'Pretendard';
  font-weight: 400;
`;

const Arrow = styled.img`
  width: 0.5rem;
  height: 0.875rem;
`;

// 계정 탈퇴 확인 모달 — AppFrame(id="app-frame") 안에 그려서 앱 프레임 폭(최대 430px)에 딱 맞춤
const WithdrawOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
`;

const WithdrawModalBox = styled.div`
  position: relative;
  width: 100%;
  background: #ffffff;
`;

const WithdrawCloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.75rem;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const WithdrawCloseIcon = styled.img`
  width: 1.125rem;
  height: 1.125rem;
  filter: invert(1);
`;

const WithdrawContent = styled.div`
  padding: 2.75rem 5.75rem 0;
  text-align: center;
`;

const WithdrawTitle = styled.p`
  margin: 0;
  color: #000000;
  font-size: 1.125rem;
  font-family: 'Pretendard';
  font-weight: 600;
  line-height: 1.4;
`;

const WithdrawDescription = styled.p`
  margin: 0;
  color: #000000;
  font-size: 0.875rem;
  font-family: 'Pretendard';
  font-weight: 400;
  line-height: 1.4;
`;

const WithdrawActions = styled.div`
  margin-top: 2rem;
  padding: 0 1.75rem 1.25rem;
`;

const WithdrawButton = styled.button`
  width: 100%;
  padding: 0.9375rem 0;
  border: 1px solid #000000;
  border-radius: 5px;
  background: none;
  color: #000000;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 500;
  cursor: pointer;
`;

// 내계정 페이지 — 로그인 상태에 따라 분기
function Account() {
  const navigate = useNavigate();
  const { myInfo, error } = useMyInfo();
  const { logout, withdraw } = useAuth();
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

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
        logout().finally(() => navigate('/login', { replace: true }));
        break;
      case 'withdraw':
        setIsWithdrawOpen(true);
        break;
      default:
        break;
    }
  };

  // 계정 탈퇴 확정 — 삭제 성공 시에만 로그아웃과 동일하게 로그인 화면으로 이동
  const handleWithdraw = async () => {
    try {
      await withdraw();
      navigate('/login', { replace: true });
    } catch {
      alert('계정 탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const appFrame = document.getElementById('app-frame');

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

      {isWithdrawOpen && appFrame
        ? createPortal(
            <WithdrawOverlay
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsWithdrawOpen(false);
              }}
            >
              <WithdrawModalBox>
                <WithdrawCloseButton
                  type="button"
                  onClick={() => setIsWithdrawOpen(false)}
                  aria-label="닫기"
                >
                  <WithdrawCloseIcon src={xIcon} alt="" aria-hidden />
                </WithdrawCloseButton>

                <WithdrawContent>
                  <WithdrawTitle>계정을 탈퇴하시겠습니까?</WithdrawTitle>
                  <WithdrawDescription>탈퇴 시 모든 정보는 삭제됩니다.</WithdrawDescription>
                </WithdrawContent>

                <WithdrawActions>
                  <WithdrawButton type="button" onClick={handleWithdraw}>
                    계정 탈퇴
                  </WithdrawButton>
                </WithdrawActions>
              </WithdrawModalBox>
            </WithdrawOverlay>,
            appFrame,
          )
        : null}
    </Page>
  );
}

export default Account;
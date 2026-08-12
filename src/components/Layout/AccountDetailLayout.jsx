import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backArrowIcon from '../../assets/icons/nav/back_arrow.svg';

// 페이지 전체를 세로로 감싸는 컨테이너 (헤더 + 제목 + 내용)
const Page = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
`;

// 상단 뒤로가기 버튼이 위치하는 헤더 영역
const Header = styled.header`
    display: flex;
    align-items: center;
    height: 96px;
    padding: 0 20px;
    border-bottom: 1px solid #F2EBE7;
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
`;

const BackArrowIcon = styled.img`
    width: 13px;
    height: 23px;
`;

// 페이지 제목 영역
const Title = styled.h1`
    margin: 32px 20px 16px;
    padding: 0 0 16px;
    color: black;
    font-size: 28px;
    font-family: 'SD Minburi';
    font-weight: 500;
    border-bottom: 1.5px solid #000000;
`;

// 실제 페이지 콘텐츠(children)가 렌더링되는 영역
const Content = styled.div`
    flex: 1;
    padding: 0 20px;
`;

// 계정 상세 페이지들(로그인 정보, 등록 상품, 매장 태그 내역 등)에서 공통으로 사용하는 레이아웃
// title: 상단에 표시할 페이지 제목
// children: 페이지별로 달라지는 실제 콘텐츠
function AccountDetailLayout({ title, children }) {
const navigate = useNavigate();

return (
    <Page>
    <Header>
        {/* 이전 페이지로 돌아가는 뒤로가기 버튼 */}
        <BackButton
        type="button"
        onClick={() => navigate(-1)}
        aria-label="뒤로가기"
        >
        <BackArrowIcon
            src={backArrowIcon}
            alt=""
            aria-hidden
        />
        </BackButton>
    </Header>

    {/* 제목이 없으면 없는대로, 있으면 있는대로 */}
    {title ? <Title>{title}</Title> : null}

    <Content>{children}</Content>
    </Page>
);
}

export default AccountDetailLayout;
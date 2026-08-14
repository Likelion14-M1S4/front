import styled from 'styled-components';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { loginInfo } from '../../mock/loginInfo';

// 정보 항목 리스트
const InfoList = styled.div`
display: flex;
flex-direction: column;
`;

// 이메일 (라벨-값 가로 배치, 첫 항목)
const EmailRow = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 1.5rem 0;
border-bottom: 1px solid #e5e4e7;
`;

const EmailLabel = styled.span`
color: black;
font-size: 1rem;
font-family: 'SD Minburi';
font-weight: 500;
`;

const EmailValue = styled.span`
color: #999999;
font-size: 1rem;
font-family: 'SD Minburi';
font-weight: 400;
`;

// 나머지 항목 (라벨 위, 값 아래 세로 배치)
const InfoRow = styled.div`
display: flex;
flex-direction: column;
gap: 0.5rem;
padding: 1.25rem 0;
`;

const InfoLabel = styled.span`
color: #999999;
font-size: 0.875rem;
font-family: 'SD Minburi';
font-weight: 400;
`;

const InfoValue = styled.span`
color: black;
font-size: 1rem;
font-family: 'SD Minburi';
font-weight: 500;
`;

// 생년월일 아래 구분선
const Divider = styled.div`
margin-top: 2.21875rem;       //겨우 맞춤
border-bottom: 1px solid #e5e4e7;
`;

// 로그인 정보 페이지 — 읽기 전용 표시
function LoginInfo() {
return (
    <AccountDetailLayout title="로그인 정보">
    <InfoList>
        {/* 이메일 — 카카오 연동 정보 */}
        <EmailRow>
            <EmailLabel>이메일</EmailLabel>
            <EmailValue>{loginInfo.email}</EmailValue>
        </EmailRow>

        <InfoRow>
            <InfoLabel>이름</InfoLabel>
            <InfoValue>{loginInfo.name}</InfoValue>
        </InfoRow>
        <InfoRow>
            <InfoLabel>전화번호</InfoLabel>
            <InfoValue>{loginInfo.phone}</InfoValue>
        </InfoRow>
        <InfoRow>
            <InfoLabel>생년월일</InfoLabel>
            <InfoValue>{loginInfo.birth}</InfoValue>
        </InfoRow>
    </InfoList>

    <Divider />
    </AccountDetailLayout>
);
}

export default LoginInfo;

import { useState } from 'react';
import styled from 'styled-components';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { loginInfo } from '../../mock/loginInfo';
import modifyPencil from '../../assets/icons/nav/modify_pencil.svg';

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
padding: 24px 0;
border-bottom: 1px solid #e5e4e7;
`;

const EmailLabel = styled.span`
color: black;
font-size: 16px;
font-family: 'SD Minburi';
font-weight: 500;
`;

const EmailValue = styled.span`
color: #999999;
font-size: 16px;
font-family: 'SD Minburi';
font-weight: 400;
`;

// 나머지 항목 (라벨 위, 값 아래 세로 배치)
// 편집 모드에서만 구분선 표시 (padding은 그대로 유지 → 위치 안 밀림)
const InfoRow = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
padding: 20px 0;
border-bottom: ${({ $editing }) =>
    $editing ? '1px solid #e5e4e7' : 'none'};
`;

const InfoLabel = styled.span`
color: #999999;
font-size: 14px;
font-family: 'SD Minburi';
font-weight: 400;
`;

// 값 + 연필 아이콘을 한 줄에 배치
const ValueRow = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;

const InfoValue = styled.span`
color: black;
font-size: 16px;
font-family: 'SD Minburi';
font-weight: 500;
`;

// 편집 모드 입력창
const Input = styled.input`
flex: 1;
padding: 0;
border: none;
color: black;
font-size: 16px;
font-family: 'SD Minburi';
font-weight: 500;
outline: none;
`;

// 연필 아이콘 버튼 (편집 모드에서만 표시)
const PencilButton = styled.button`
display: flex;
align-items: center;
padding: 0;
border: none;
background: none;
cursor: pointer;
`;

const PencilIcon = styled.img`
    width: 16px;
height: 16px;
`;

// 보기 모드 전용 — 생년월일 아래 구분선
const Divider = styled.div`
margin-top: 35.5px;       //겨우 맞춤
border-bottom: 1px solid #e5e4e7;
`;

// 편집 모드 전용 — 마지막 항목 아래 추가 구분선 (32px 아래)
const EditDivider = styled.div`
margin-top: 32px;
border-bottom: 1px solid #e5e4e7;
`;

// 하단 "정보 수정 / 수정 완료" 토글 버튼
const EditButton = styled.button`
margin-top: 52px;   
padding: 18px;
width: 100%;
border: 1px solid #cccccc;
background: none;
color: black;
font-size: 20px;
font-family: 'SD Minburi';
font-weight: 500;
border-radius: 5px;
cursor: pointer;
`;

// 로그인 정보 페이지
function LoginInfo() {
// 편집 모드 여부 (false: 보기 모드 / true: 수정 모드)
const [isEditing, setIsEditing] = useState(false);
// 현재 입력창이 열린 항목 (한 번에 하나만 수정)
const [activeField, setActiveField] = useState(null);
// 입력값 상태 — mock으로 초기화 (추후 API 응답으로 교체)
const [form, setForm] = useState(loginInfo);

// 입력창 값 변경 처리
const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
};

// 정보 수정 ↔ 수정 완료 토글
const handleToggle = () => {
    if (isEditing) {
    // 수정 완료 시 저장 처리
    // TODO: PATCH /api/account/login-info 로 form 전송
    setActiveField(null); // 열린 입력창 닫기
    }
    setIsEditing((prev) => !prev);
};

// 편집 가능한 항목 렌더링 (이름/전화번호/생년월일 공통)
const renderEditableRow = (field, label) => (
    <InfoRow $editing={isEditing}>
        <InfoLabel>{label}</InfoLabel>
        <ValueRow>
            {isEditing && activeField === field ? (
            // 연필을 눌러 활성화된 항목 → 입력창
            <Input
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                autoFocus
            />
            ) : (
            <InfoValue>{form[field]}</InfoValue>
            )}

            {/* 편집 모드일 때만 연필 표시 → 누르면 해당 항목 입력창 활성화 */}
            {isEditing ? (
            <PencilButton
                type="button"
                onClick={() => setActiveField(field)}
                aria-label={`${label} 수정`}
            >
                <PencilIcon src={modifyPencil} alt="" aria-hidden />
            </PencilButton>
            ) : null}
        </ValueRow>
    </InfoRow>
);

return (
    <AccountDetailLayout title="로그인 정보">
    <InfoList>
        {/* 이메일 — 카카오 연동 정보라 수정 불가 */}
        <EmailRow>
            <EmailLabel>이메일</EmailLabel>
            <EmailValue>{form.email}</EmailValue>
        </EmailRow>

        {/* 이름 / 전화번호 / 생년월일 — 편집 모드일 때 연필로 수정 */}
        {renderEditableRow('name', '이름')}
        {renderEditableRow('phone', '전화번호')}
        {renderEditableRow('birth', '생년월일')}
    </InfoList>

    {/* 보기 모드: 생년월일 아래 40px 구분선 / 편집 모드: 32px 구분선 */}
    {isEditing ? <EditDivider /> : <Divider />}

    {/* 정보 수정 ↔ 수정 완료 토글 버튼 */}
    <EditButton type="button" onClick={handleToggle}>
        {isEditing ? '수정 완료' : '정보 수정'}
    </EditButton>
    </AccountDetailLayout>
);
}

export default LoginInfo;
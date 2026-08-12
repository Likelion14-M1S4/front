import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { getRegisteredProductDetail } from '../../api/registeredProductDetail';
import halfArrow from '../../assets/icons/nav/half_arrow.svg';

// AccountDetailLayout의 좌우 20px 패딩을 상쇄 — 썸네일을 기기 너비(390px)에 꽉 채우기 위함
const Bleed = styled.div`
    margin: 0 -20px;
`;

// 제품 사진 — 390(고정) x 328, api 연동 전이라 자리만 잡아둠
const Thumbnail = styled.img`
    width: 100%;
    height: 328px;
    background: #f6f4f2;
    object-fit: cover;
`;

// 텍스트 영역 — AccountDetailLayout의 좌우 20px 패딩을 상쇄하고 24px로 재적용
const Body = styled.div`
    margin: 0 -20px;
    padding: 0 24px 40px;
`;

// 제품명 — 썸네일과 72px 간격
const Name = styled.p`
    margin: 72px 0 0;
    color: black;
    font-size: 20px;
    font-family: 'SD Minburi';
    font-weight: 500;
    line-height: 1.4;
`;

// 색상 — 제품명과 34px 간격
const ColorLabel = styled.p`
    margin: 34px 0 0;
    color: black;
    font-size: 16px;
    font-family: 'SD Minburi';
    font-weight: 400;
`;

// 사이즈 — 색상과 12px 간격
const SizeLabel = styled.p`
    margin: 12px 0 0;
    color: black;
    font-size: 16px;
    font-family: 'SD Minburi';
    font-weight: 400;
`;

// 제품 확인하기 버튼 — 사이즈와 103px 간격
const CheckButton = styled.button`
    display: block;
    width: 100%;
    margin-top: 103px;
    padding: 15px 0 14px;
    border: 1px solid black;
    border-radius: 5px;
    background: none;
    color: black;
    font-size: 20px;
    font-family: 'SD Minburi';
    font-weight: 500;
    text-align: center;
    cursor: pointer;
`;

// 구매 정보 제목 — 버튼과 97px 간격
const PurchaseTitle = styled.p`
    margin: 97px 0 0;
    color: black;
    font-size: 16px;
    font-family: 'SD Minburi';
    font-weight: 500;
`;

// 구매 일시/등록 일시/구매 매장 — 첫 줄은 구매 정보와 16px, 이후 줄은 서로 8px 간격
const PurchaseRow = styled.p`
    margin: 16px 0 0;
    color: black;
    font-size: 14px;
    font-family: 'SD Minburi';
    font-weight: 400;

    & + & {
        margin-top: 8px;
    }
`;

// 정품 인증서 확인 — 구매 매장과 76px 간격, 화살표는 같은 줄 오른쪽 끝
const CertRow = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 76px;
    padding: 0;
    border: none;
    background: none;
    color: black;
    font-size: 15px;
    font-family: 'SD Minburi';
    font-weight: 400;
    cursor: pointer;
`;

const CertArrow = styled.img`
    width: 49px;
    height: 9px;
`;

// 정품 인증서 확인 블록과 15px 간격의 구분선
const CertDivider = styled.div`
    margin-top: 15px;
    border-bottom: 1px solid #e5e4e7;
`;

// 등록한 제품 상세 페이지 — 등록한 제품 목록에서 제품을 누르면 이동
function RegisteredProductDetail() {
    const { productId } = useParams();
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        getRegisteredProductDetail(productId).then(setDetail);
    }, [productId]);

    if (!detail) return null;

    return (
        <AccountDetailLayout>
            <Bleed>
                <Thumbnail src={detail.imageUrl} alt={detail.name} />
            </Bleed>

            <Body>
                <Name>{detail.name}</Name>
                <ColorLabel>색상: {detail.colorLabel}</ColorLabel>
                <SizeLabel>사이즈 : {detail.sizeLabel}</SizeLabel>

                {/* TODO: 제품 상세 페이지 연결 */}
                <CheckButton type="button">제품 확인하기</CheckButton>

                <PurchaseTitle>구매 정보</PurchaseTitle>
                <PurchaseRow>구매 일시: {detail.purchasedAt}</PurchaseRow>
                <PurchaseRow>등록 일시: {detail.registeredAt}</PurchaseRow>
                <PurchaseRow>구매 매장: {detail.storeName}</PurchaseRow>

                {/* TODO: 정품 인증서 확인 페이지 연결 */}
                <CertRow type="button">
                    정품 인증서 확인
                    <CertArrow src={halfArrow} alt="" aria-hidden />
                </CertRow>
                <CertDivider />
            </Body>
        </AccountDetailLayout>
    );
}

export default RegisteredProductDetail;

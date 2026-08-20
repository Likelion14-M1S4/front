import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { getRegisteredProductDetail } from '../../api/registeredProductDetail';
import halfArrow from '../../assets/icons/nav/half_arrow.svg';

// AccountDetailLayout의 좌우 1.25rem 패딩을 상쇄 — 썸네일을 기기 너비에 꽉 채우기 위함
const Bleed = styled.div`
    margin: 0 -1.25rem;
`;

// 제품 사진 — api 연동 전이라 자리만 잡아둠
const Thumbnail = styled.img`
    width: 100%;
    height: 20.5rem;
    background: #f6f4f2;
    object-fit: cover;
`;

// 텍스트 영역 — AccountDetailLayout의 좌우 1.25rem 패딩을 상쇄하고 1.5rem로 재적용
const Body = styled.div`
    margin: 0 -1.25rem;
    padding: 0 1.5rem 2.5rem;
`;

// 제품명 — 썸네일과 4.5rem 간격
const Name = styled.p`
    margin: 4.5rem 0 0;
    color: black;
    font-size: 1.25rem;
    font-family: 'Pretendard';
    font-weight: 500;
    line-height: 1.4;
`;

// 색상 — 제품명과 2.125rem 간격
const ColorLabel = styled.p`
    margin: 2.125rem 0 0;
    color: black;
    font-size: 1rem;
    font-family: 'Pretendard';
    font-weight: 400;
`;

// 사이즈 — 색상과 0.75rem 간격
const SizeLabel = styled.p`
    margin: 0.75rem 0 0;
    color: black;
    font-size: 1rem;
    font-family: 'Pretendard';
    font-weight: 400;
`;

// 제품 확인하기 버튼 — 사이즈와 6.4375rem 간격
const CheckButton = styled.button`
    display: block;
    width: 100%;
    margin-top: 6.4375rem;
    padding: 0.9375rem 0 0.875rem;
    border: 1px solid black;
    border-radius: 5px;
    background: none;
    color: black;
    font-size: 1.25rem;
    font-family: 'Pretendard';
    font-weight: 500;
    text-align: center;
    cursor: pointer;
`;

// 구매 정보 제목 — 버튼과 6.0625rem 간격
const PurchaseTitle = styled.p`
    margin: 6.0625rem 0 0;
    color: black;
    font-size: 1rem;
    font-family: 'Pretendard';
    font-weight: 500;
`;

// 구매 일시/등록 일시/구매 매장 — 첫 줄은 구매 정보와 1rem, 이후 줄은 서로 0.5rem 간격
const PurchaseRow = styled.p`
    margin: 1rem 0 0;
    color: black;
    font-size: 0.875rem;
    font-family: 'Pretendard';
    font-weight: 400;

    & + & {
        margin-top: 0.5rem;
    }
`;

// 정품 인증서 확인 — 구매 매장과 4.75rem 간격, 화살표는 같은 줄 오른쪽 끝
const CertRow = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 4.75rem;
    padding: 0;
    border: none;
    background: none;
    color: black;
    font-size: 0.9375rem;
    font-family: 'Pretendard';
    font-weight: 400;
    cursor: pointer;
`;

const CertArrow = styled.img`
    width: 3.0625rem;
    height: 0.5625rem;
`;

// 정품 인증서 확인 블록과 0.9375rem 간격의 구분선
const CertDivider = styled.div`
    margin-top: 0.9375rem;
    border-bottom: 1px solid #e5e4e7;
`;

// 등록한 제품 상세 페이지 — 등록한 제품 목록에서 제품을 누르면 이동
function RegisteredProductDetail() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        getRegisteredProductDetail(productId).then(setDetail);
    }, [productId]);

    if (!detail) return null;

    const handleCheckProduct = () => {
        const catalogId = detail.productId ?? detail.id;
        if (catalogId != null && catalogId !== '') navigate(`/product/${catalogId}`);
    };

    return (
        <AccountDetailLayout>
            <Bleed>
                <Thumbnail src={detail.imageUrl} alt={detail.name} />
            </Bleed>

            <Body>
                <Name>{detail.name}</Name>
                <ColorLabel>색상: {detail.colorLabel}</ColorLabel>
                <SizeLabel>사이즈 : {detail.sizeLabel}</SizeLabel>

                <CheckButton type="button" onClick={handleCheckProduct}>제품 확인하기</CheckButton>

                <PurchaseTitle>구매 정보</PurchaseTitle>
                <PurchaseRow>구매 일시: {detail.purchasedAt}</PurchaseRow>
                <PurchaseRow>등록 일시: {detail.registeredAt}</PurchaseRow>
                <PurchaseRow>구매 매장: {detail.storeName}</PurchaseRow>

                <CertRow type="button" onClick={() => navigate(`/account/products/${productId}/certificate`)}>
                    정품 인증서 확인
                    <CertArrow src={halfArrow} alt="" aria-hidden />
                </CertRow>
                <CertDivider />
            </Body>
        </AccountDetailLayout>
    );
}

export default RegisteredProductDetail;

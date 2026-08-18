import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCertificate } from '../../api/certificate';
import { NFC_UID_KEY } from '../../constants/storeTagSession';

// 헤더/네비게이션 없이 흰 배경으로 꽉 채우는 페이지
const Page = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  padding-bottom: 12.25rem;
  background: #ffffff;
`;

// "정품 인증서" 타이틀 — 페이지 맨 위에서 4.5rem, 좌우 중앙 정렬
const Title = styled.h1`
  margin: 4.5rem 0 0;
  color: black;
  font-size: 1.5rem;
  font-family: 'Pretendard';
  font-weight: 500;
  text-align: center;
`;

// 제품 사진 박스 — 타이틀과 2.25rem 간격, 좌우 0.9375rem씩
// width/height를 고정하지 않고 aspect-ratio로 비율만 유지해, 프레임이 390px보다 커져도 폭에 맞춰 늘어남
const Thumbnail = styled.img`
  width: calc(100% - 1.875rem);
  aspect-ratio: 360 / 233;
  margin: 2.25rem 0.9375rem 0;
  background: #f6f4f2;
  object-fit: cover;
`;

// 제품명 — 사진 박스와 2.25rem 간격, 왼쪽 1.5rem
const ProductName = styled.p`
  margin: 2.25rem 0 0 1.5rem;
  color: black;
  font-size: 1.25rem;
  font-family: 'Pretendard';
  font-weight: 500;
`;

// 상품 주문번호 — 제품명과 2.25rem 간격, 왼쪽 1.5rem
const OrderNumber = styled.p`
  margin: 2.25rem 0 0 1.5rem;
  color: black;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 400;
`;

// 상품 번호 — 주문번호와 0.25rem 간격
const ProductNumber = styled.p`
  margin: 0.25rem 0 0 1.5rem;
  color: black;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 400;
`;

// 보증서 발급일 — 상품 번호와 1rem 간격
const IssuedAt = styled.p`
  margin: 1rem 0 0 1.5rem;
  color: black;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 400;
`;

// 구매 일시 — 보증서 발급일과 1.5rem 간격
const PurchasedAt = styled.p`
  margin: 1.5rem 0 0 1.5rem;
  color: black;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 400;
`;

// 수령 일시 / 판매자 / 구매처 — 바로 위 항목과 각각 0.25rem 간격
const InfoRow = styled.p`
  margin: 0.25rem 0 0 1.5rem;
  color: black;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 400;
`;

// 다음 버튼 — 컬렉션에 추가 버튼과 화면상 같은 위치에 겹치도록 페이지 하단에 고정
const NextButton = styled.button`
  position: absolute;
  left: 1.5rem;
  right: 1.5rem;
  bottom: 7.25rem;
  height: 3.5rem;
  border: none;
  border-radius: 5px;
  background: #1E1E1E;
  color: #ffffff;
  font-size: 1.25rem;
  font-family: 'Pretendard';
  font-weight: 500;
  cursor: pointer;
`;

// 정품 인증서 페이지 — 매장 태그 화면 다음, 로그인 화면 이전에 노출
function Certificate() {
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const uid = sessionStorage.getItem(NFC_UID_KEY) || undefined;
    getCertificate(uid).then(setCertificate);
  }, []);

  if (!certificate) return null;

  const handleNext = () => {
    navigate('/character/add');
  };

  return (
    <Page>
      <Title>정품 인증서</Title>

      <Thumbnail src={certificate.imageUrl} alt={certificate.productName} />

      <ProductName>{certificate.productName}</ProductName>

      <OrderNumber>상품 주문번호: {certificate.orderNumber}</OrderNumber>
      <ProductNumber>상품 번호: {certificate.productNumber}</ProductNumber>

      <IssuedAt>보증서 발급일: {certificate.issuedAt}</IssuedAt>

      <PurchasedAt>구매 일시: {certificate.purchasedAt}</PurchasedAt>
      <InfoRow>수령 일시: {certificate.receivedAt}</InfoRow>
      <InfoRow>판매자: {certificate.seller}</InfoRow>
      <InfoRow>구매처: {certificate.purchasePlace}</InfoRow>

      <NextButton type="button" onClick={handleNext}>
        다음
      </NextButton>
    </Page>
  );
}

export default Certificate;

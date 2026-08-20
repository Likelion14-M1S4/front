import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { getCertificate } from '../../api/certificate';

// "정품 인증서" 타이틀 — 가운데 정렬
const Title = styled.h1`
  margin: 0;
  color: black;
  font-size: 1.5rem;
  font-family: 'Pretendard';
  font-weight: 500;
  text-align: center;
`;

// 제품 사진 박스 — AccountDetailLayout 콘텐츠 상단과 1.5rem 간격
const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 360 / 233;
  margin-top: 1.5rem;
  background: #f6f4f2;
  object-fit: cover;
`;

// 제품명 — 사진 박스와 2.25rem 간격
const ProductName = styled.p`
  margin: 2.25rem 0 0;
  color: black;
  font-size: 1.25rem;
  font-family: 'Pretendard';
  font-weight: 500;
`;

// 상품 주문번호 — 제품명과 2.25rem 간격
const OrderNumber = styled.p`
  margin: 2.25rem 0 0;
  color: black;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 400;
`;

// 상품 번호 — 주문번호와 0.25rem 간격
const ProductNumber = styled.p`
  margin: 0.25rem 0 0;
  color: black;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 400;
`;

// 보증서 발급일 — 상품 번호와 1rem 간격
const IssuedAt = styled.p`
  margin: 1rem 0 0;
  color: black;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 400;
`;

// 구매 일시 — 보증서 발급일과 1.5rem 간격
const PurchasedAt = styled.p`
  margin: 1.5rem 0 0;
  color: black;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 400;
`;

// 수령 일시 / 판매자 / 구매처 — 바로 위 항목과 각각 0.25rem 간격
const InfoRow = styled.p`
  margin: 0.25rem 0 0;
  color: black;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 400;
`;

// 등록한 제품 상세에서 "정품 인증서 확인"을 눌렀을 때 보여주는 정품 인증서 페이지
function ProductCertificate() {
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    getCertificate().then(setCertificate);
  }, []);

  if (!certificate) return null;

  return (
    <AccountDetailLayout>
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
    </AccountDetailLayout>
  );
}

export default ProductCertificate;

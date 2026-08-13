import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCertificate } from '../../api/certificate';

// 헤더/네비게이션 없이 흰 배경으로 꽉 채우는 페이지
const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  padding-bottom: 40px;
  background: #ffffff;
`;

// "정품 인증서" 타이틀 — 페이지 맨 위에서 72px, 좌우 중앙 정렬
const Title = styled.h1`
  margin: 72px 0 0;
  color: black;
  font-size: 24px;
  font-family: 'SD Minburi';
  font-weight: 500;
  text-align: center;
`;

// 제품 사진 박스 — 타이틀과 36px 간격, 360x233, 좌우 15px씩
const Thumbnail = styled.img`
  width: 360px;
  height: 233px;
  margin: 36px 15px 0;
  background: #f6f4f2;
  object-fit: cover;
`;

// 제품명 — 사진 박스와 36px 간격, 왼쪽 24px
const ProductName = styled.p`
  margin: 36px 0 0 24px;
  color: black;
  font-size: 20px;
  font-family: 'SD Minburi';
  font-weight: 500;
`;

// 상품 주문번호 — 제품명과 36px 간격, 왼쪽 24px
const OrderNumber = styled.p`
  margin: 36px 0 0 24px;
  color: black;
  font-size: 16px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

// 상품 번호 — 주문번호와 4px 간격
const ProductNumber = styled.p`
  margin: 4px 0 0 24px;
  color: black;
  font-size: 16px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

// 보증서 발급일 — 상품 번호와 16px 간격
const IssuedAt = styled.p`
  margin: 16px 0 0 24px;
  color: black;
  font-size: 16px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

// 구매 일시 — 보증서 발급일과 24px 간격
const PurchasedAt = styled.p`
  margin: 24px 0 0 24px;
  color: black;
  font-size: 16px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

// 수령 일시 / 판매자 / 구매처 — 바로 위 항목과 각각 4px 간격
const InfoRow = styled.p`
  margin: 4px 0 0 24px;
  color: black;
  font-size: 16px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

// 다음 버튼 — 구매처와 44px 간격, 342x27, 좌우 24px씩
const NextButton = styled.button`
  width: 342px;
  height: 56px;
  margin: 44px 24px 0;
  border: none;
  border-radius: 5px;
  background: #1E1E1E;
  color: #ffffff;
  font-size: 20px;
  font-family: 'SD Minburi';
  font-weight: 500;
  cursor: pointer;
`;

// 정품 인증서 페이지 — 매장 태그 화면 다음, 로그인 화면 이전에 노출
function Certificate() {
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    getCertificate().then(setCertificate);
  }, []);

  if (!certificate) return null;

  const handleNext = () => {
    // TODO: 정품인증 다음 단계(태그 캐릭터 화면)가 생기면 그쪽으로 교체
    navigate('/login');
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

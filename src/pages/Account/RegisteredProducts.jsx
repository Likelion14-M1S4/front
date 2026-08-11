import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { getRegisteredProducts } from '../../api/registeredProducts';

// 상품 그리드 — AccountDetailLayout의 좌우 20px 패딩을 상쇄하고 23px로 재적용
// margin-top 16px: Title의 margin-bottom 16px와 합쳐 구분선과 32px 간격을 만듦
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 162px);
  column-gap: 22px;
  row-gap: 32px;
  margin: 16px -20px 0;
  padding: 0 23px;
`;

// 상품 1개 카드 (썸네일 + 이름 + 등록일)
const Card = styled.div`
  display: flex;
  flex-direction: column;
`;

// 썸네일 — 162x162, 로딩 전/이미지 없을 때 대비한 배경색
const Thumbnail = styled.img`
  width: 162px;
  height: 162px;
  background: #f6f4f2;
  object-fit: cover;
`;

// 상품명 — 한 줄로 자르고 넘치면 말줄임표 처리
const Name = styled.p`
  margin: 14px 0 0;
  width: 162px;
  overflow: hidden;
  color: black;
  font-size: 14px;
  font-family: 'SD Minburi';
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// 등록일
const RegisteredDate = styled.p`
  margin: 6px 0 0;
  color: #000000;
  font-size: 13px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

// 등록한 제품 페이지 — 계정에 등록한 제품 목록을 보여줌
function RegisteredProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getRegisteredProducts().then(setProducts);
  }, []);

  return (
    <AccountDetailLayout title="등록한 제품">
      <Grid>
        {products.map((product) => (
          <Card key={product.id}>
            <Thumbnail src={product.imageUrl} alt={product.name} />
            <Name>{product.name}</Name>
            <RegisteredDate>{product.registeredAt}</RegisteredDate>
          </Card>
        ))}
      </Grid>
    </AccountDetailLayout>
  );
}

export default RegisteredProducts;

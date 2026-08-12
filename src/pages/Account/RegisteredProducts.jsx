import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
    padding: 0 21px;
`;

// 상품 1개 카드 (썸네일 + 이름 + 등록일) — 누르면 상세 페이지로 이동
const Card = styled(Link)`
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

// 등록한 제품이 없을 때
const EmptyState = styled.div`
    margin-top: 179px;
    text-align: center;
`;

const EmptyTitle = styled.p`
    margin: 0;
    color: black;
    font-size: 16px;
    font-family: 'SD Minburi';
    font-weight: 500;
`;

// 안내 문구 — 제목과 9px 간격
const EmptySubtitle = styled.p`
    margin: 9px 0 0;
    color: #000000;
    font-size: 16px;
    font-family: 'SD Minburi';
    font-weight: 400;
`;

// 추천 제품 링크 — 안내 문구와 40px 간격
const EmptyLink = styled(Link)`
    display: inline-block;
    margin-top: 40px;
    color: black;
    font-size: 16px;
    font-family: 'SD Minburi';
    font-weight: 400;
    text-decoration: underline;
    text-underline-offset: 3px;
`;

// 등록한 제품 페이지 — 계정에 등록한 제품 목록을 보여줌
function RegisteredProducts() {
const [products, setProducts] = useState([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    getRegisteredProducts().then((data) => {
    setProducts(data);
    setIsLoading(false);
    });
}, []);

if (!isLoading && products.length === 0) {
    return (
    <AccountDetailLayout title="등록한 제품">
        <EmptyState>
        <EmptyTitle>등록한 제품이 아직 없습니다.</EmptyTitle>
        <EmptySubtitle>구매한 제품의 NFC를 태그해보세요.</EmptySubtitle>
        <EmptyLink to="/recommend">추천 제품 확인하기</EmptyLink>
        </EmptyState>
    </AccountDetailLayout>
    );
}

return (
    <AccountDetailLayout title="등록한 제품">
    <Grid>
        {products.map((product) => (
        <Card key={product.id} to={`/account/products/${product.id}`}>
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

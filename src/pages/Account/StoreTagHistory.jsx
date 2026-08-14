import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { getStoreTagHistory } from '../../api/storeTagHistory';

// 방문 이력 리스트
const List = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2.875rem;
`;

// 매장 1곳의 방문 이력 — 테두리 없는 버튼, 누르면 해당 매장 상세로 이동
const Row = styled(Link)`
    display: block;
    padding-bottom: 1rem;
    border-bottom: 0.25px solid #EBE8E5;
    margin-bottom: 2rem;

    &:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
`;

const StoreName = styled.p`
    margin: 0;
    color: black;
    font-size: 1rem;
    font-family: 'SD Minburi';
    font-weight: 500;
`;

// 마지막 방문 일자
const LastVisited = styled.p`
    margin: 0.75rem 0 0;
    color: #000000;
    font-size: 0.875rem;
    font-family: 'SD Minburi';
    font-weight: 400;
`;

// 매장 태그 이력이 없을 때
const EmptyState = styled.div`
    margin-top: 11.1875rem;
    text-align: center;
`;

const EmptyTitle = styled.p`
    margin: 0;
    color: black;
    font-size: 1rem;
    font-family: 'SD Minburi';
    font-weight: 500;
`;

// 안내 문구 — 제목과 0.5625rem 간격
const EmptySubtitle = styled.p`
    margin: 0.5625rem 0 0;
    color: #000000;
    font-size: 1rem;
    font-family: 'SD Minburi';
    font-weight: 400;
`;

// 스토리 링크 — 안내 문구와 2.5rem 간격
const EmptyLink = styled(Link)`
    display: inline-block;
    margin-top: 2.5rem;
    color: black;
    font-size: 1rem;
    font-family: 'SD Minburi';
    font-weight: 400;
    text-decoration: underline;
    text-underline-offset: 0.1875rem;
`;

// 매장 태그 이력 페이지 — 매장에서 태그한 방문 이력을 보여줌
function StoreTagHistory() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStoreTagHistory().then((data) => {
      setHistory(data);
      setIsLoading(false);
    });
  }, []);

  if (!isLoading && history.length === 0) {
    return (
      <AccountDetailLayout title="매장 태그 이력">
        <EmptyState>
          <EmptyTitle>아직 매장에서 태그한 제품이 없습니다</EmptyTitle>
          <EmptySubtitle>제품의NFC를 태그해 제품의 정보를 확인해보세요.</EmptySubtitle>
          <EmptyLink to="/story">스토리 보러가기</EmptyLink>
        </EmptyState>
      </AccountDetailLayout>
    );
  }

  return (
    <AccountDetailLayout title="매장 태그 이력">
      <List>
        {history.map((store) => (
          <Row key={store.id} to={`/account/tag-history/${store.id}`}>
            <StoreName>{store.storeName}</StoreName>
            <LastVisited>마지막 방문 일자: {store.lastVisitedAt}</LastVisited>
          </Row>
        ))}
      </List>
    </AccountDetailLayout>
  );
}

export default StoreTagHistory;

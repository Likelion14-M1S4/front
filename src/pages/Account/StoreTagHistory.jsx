import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { getStoreTagHistory } from '../../api/storeTagHistory';

// 방문 이력 리스트
const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 46px;
`;

// 매장 1곳의 방문 이력
const Row = styled.div`
  padding-bottom: 16px;
  border-bottom: 0.25px solid #EBE8E5;
  margin-bottom: 32px;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const StoreName = styled.p`
  margin: 0;
  color: black;
  font-size: 16px;
  font-family: 'SD Minburi';
  font-weight: 500;
`;

// 마지막 방문 일자
const LastVisited = styled.p`
  margin: 12px 0 0;
  color: #000000;
  font-size: 14px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

// 매장 태그 이력 페이지 — 매장에서 태그한 방문 이력을 보여줌
function StoreTagHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getStoreTagHistory().then(setHistory);
  }, []);

  return (
    <AccountDetailLayout title="매장 태그 이력">
      <List>
        {history.map((store) => (
          <Row key={store.id}>
            <StoreName>{store.storeName}</StoreName>
            <LastVisited>마지막 방문 일자: {store.lastVisitedAt}</LastVisited>
          </Row>
        ))}
      </List>
    </AccountDetailLayout>
  );
}

export default StoreTagHistory;

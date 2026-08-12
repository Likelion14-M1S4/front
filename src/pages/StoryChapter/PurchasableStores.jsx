import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { getPurchasableStores } from '../../api/purchasableStores';
import halfArrow from '../../assets/icons/nav/half_arrow.svg';

// AccountDetailLayout의 좌우 20px 패딩을 상쇄 — 요소별로 각자 다른 여백을 직접 적용하기 위함
const Bleed = styled.div`
  margin: 0 -20px;
`;

// 제목 — 구분선과 76px 간격, 가운데 정렬
const Heading = styled.p`
  margin: 76px 0 0;
  color: black;
  font-size: 20px;
  font-family: 'SD Minburi';
  font-weight: 500;
  text-align: center;
`;

// 검색 바 — 제목과 52px 간격, 텍스트는 왼쪽 48px, 화살표는 오른쪽 32px
const SearchRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 52px;
  padding: 0 32px 0 48px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0;
  border: none;
  outline: none;
  background: none;
  color: black;
  font-size: 14px;
  font-family: 'SD Minburi';
  font-weight: 400;

  &::placeholder {
    color: #999999;
  }
`;

const SearchArrow = styled.img`
  width: 24px;
  height: 12px;
`;

// 검색 바 아래 구분선 — 8px 간격, 양쪽 27px 인셋
const Divider = styled.div`
  margin: 8px 27px 0;
  border-bottom: 1px solid #e5e4e7;
`;

// 매장 목록 — 구분선과 46px 간격, 양쪽 27px 인셋
const StoreList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 46px 27px 40px;
`;

// 매장 1개 — 안쪽 위아래 29px, 좌우 41px
const StoreCard = styled.button`
  display: block;
  width: 100%;
  padding: 29px 41px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
`;

const StoreName = styled.p`
  margin: 0;
  color: black;
  font-size: 16px;
  font-family: 'SD Minburi';
  font-weight: 500;
`;

// 주소 — 매장명과 16px 간격
const StoreAddress = styled.p`
  margin: 16px 0 0;
  color: black;
  font-size: 14px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

// 우편번호 — 주소와 4px 간격
const StorePostalCode = styled.p`
  margin: 4px 0 0;
  color: black;
  font-size: 14px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

// 전화번호 — 우편번호와 16px 간격 (펼쳤을 때만 표시)
const StorePhone = styled.p`
  margin: 16px 0 0;
  color: black;
  font-size: 14px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

// 요일별 운영시간 — 전화번호와 20px 간격
const HoursList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

// 요일 + 운영시간 한 줄 — 다음 줄과 4px 간격
const HoursRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  color: black;
  font-size: 14px;
  font-family: 'SD Minburi';
  font-weight: 400;

  &:first-child {
    margin-top: 0;
  }
`;

// 검색 결과가 없을 때 — 매장 목록과 같은 여백 규칙
const NoResults = styled.p`
  margin: 46px 27px 40px;
  color: #999999;
  font-size: 14px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

// 구매 가능 매장 페이지 — 매장을 누르면 그 자리에서 상세 정보가 펼쳐짐
function PurchasableStores() {
  const [stores, setStores] = useState([]);
  const [expandedStoreId, setExpandedStoreId] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getPurchasableStores().then(setStores);
  }, []);

  const handleStoreClick = (storeId) => {
    setExpandedStoreId((prev) => (prev === storeId ? null : storeId));
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredStores = normalizedQuery
    ? stores.filter((store) =>
        `${store.name} ${store.address} ${store.postalCode}`
          .toLowerCase()
          .includes(normalizedQuery),
      )
    : stores;

  return (
    <AccountDetailLayout>
      <Bleed>
        <Heading>구매 가능 매장</Heading>

        <SearchRow>
          <SearchInput
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="주소, 도시, 우편번호 등으로 검색하기"
            aria-label="매장 검색"
          />
          <SearchArrow src={halfArrow} alt="" aria-hidden />
        </SearchRow>

        <Divider />

        {filteredStores.length === 0 ? (
          <NoResults>검색 결과가 없습니다.</NoResults>
        ) : (
        <StoreList>
          {filteredStores.map((store) => (
            <StoreCard
              key={store.id}
              type="button"
              onClick={() => handleStoreClick(store.id)}
            >
              <StoreName>{store.name}</StoreName>
              <StoreAddress>{store.address}</StoreAddress>
              <StorePostalCode>{store.postalCode}</StorePostalCode>

              {expandedStoreId === store.id ? (
                <>
                  <StorePhone>{store.phone}</StorePhone>
                  <HoursList>
                    {store.hours.map((item) => (
                      <HoursRow key={item.day}>
                        <span>{item.day}</span>
                        <span>{item.time}</span>
                      </HoursRow>
                    ))}
                  </HoursList>
                </>
              ) : null}
            </StoreCard>
          ))}
        </StoreList>
        )}
      </Bleed>
    </AccountDetailLayout>
  );
}

export default PurchasableStores;

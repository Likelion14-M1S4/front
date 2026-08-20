import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { getWishlist, toggleWishlist } from '../../api/wishlist';
import xIcon from '../../assets/icons/nav/Xicon.svg';

// 위시리스트 목록 — Title의 기본 margin-bottom(1rem) + margin-top 1.5rem = 구분선과 2.5rem 간격
// AccountDetailLayout의 좌우 1.25rem 패딩을 상쇄하고 1.5rem로 재적용
const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5rem -1.25rem 0;
  padding: 0 1.5rem;
`;

// 위시리스트 항목 1개 — 마지막 항목 아래 여백 없음
const Row = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemLink = styled(Link)`
  display: flex;
  align-items: flex-start;
  flex: 1;
  min-width: 0;
`;

const Thumbnail = styled.img`
  width: 6rem;
  height: 6rem;
  flex-shrink: 0;
  background: #f6f4f2;
  object-fit: cover;
`;

// 상품명/색상 — 썸네일과 1.9375rem 간격, X 아이콘과 겹치지 않게 오른쪽 여백 확보
const Info = styled.div`
  flex: 1;
  min-width: 0;
  margin-left: 1.9375rem;
  padding-right: 1.5rem;
`;

const Name = styled.p`
  margin: 1rem 0 0;
  overflow: hidden;
  color: black;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// 컬러 — 상품명과 0.25rem 간격
const ColorLabel = styled.p`
  margin: 0.25rem 0 0;
  color: #999999;
  font-size: 0.875rem;
  font-family: 'Pretendard';
  font-weight: 400;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

// Xicon.svg는 흰색 채우기(어두운 배경용)라 흰 배경 위에서 보이도록 반전
const RemoveIcon = styled.img`
  width: 1rem;
  height: 1rem;
  filter: invert(1);
`;

// 위시리스트가 비어있을 때 — 구분선과 2.5rem 간격 (목록과 동일)
const EmptyState = styled.div`
  margin-top: 11.1875rem;
  text-align: center;
`;

const EmptyTitle = styled.p`
  margin: 0;
  color: black;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 500;
`;

// 안내 문구 — 제목과 0.5625rem 간격
const EmptySubtitle = styled.p`
  margin: 0.5625rem 0 0;
  color: #000000;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 400;
`;

// 추천 제품 링크 — 안내 문구와 2.5rem 간격
const EmptyLink = styled(Link)`
  display: inline-block;
  margin-top: 2.5rem;
  color: black;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 400;
  text-decoration: underline;
  text-underline-offset: 0.1875rem;
`;

// 위시리스트 페이지 — 찜한 상품 목록을 보여줌
function Wishlist() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWishlist()
      .then((data) => setItems(data))
      .finally(() => setIsLoading(false));
  }, []);

  // 위시리스트에서 제거 — 하트와 같은 toggle API를 써서 찜 해제
  const handleRemove = async (item) => {
    setItems((prev) => prev.filter((current) => current.id !== item.id));

    try {
      await toggleWishlist(
        item.type === 'CHARM' ? { charmId: item.targetId } : { productId: item.targetId },
      );
    } catch {
      setItems((prev) => [...prev, item]);
    }
  };

  if (!isLoading && items.length === 0) {
    return (
      <AccountDetailLayout title="위시리스트">
        <EmptyState>
          <EmptyTitle>위시리스트에 제품이 없습니다.</EmptyTitle>
          <EmptySubtitle>첫 번째 위시리스트를 작성해보세요.</EmptySubtitle>
          <EmptyLink to="/recommend">추천 제품 확인하기</EmptyLink>
        </EmptyState>
      </AccountDetailLayout>
    );
  }

  return (
    <AccountDetailLayout title="위시리스트">
      <List>
        {items.map((item) => (
          <Row key={item.id}>
            <ItemLink
              to={item.type === 'CHARM' ? `/season/${item.targetId}` : `/product/${item.targetId}`}
            >
              <Thumbnail src={item.imageUrl} alt={item.name} />
              <Info>
                <Name>{item.name}</Name>
                {item.colorLabel && <ColorLabel>{item.colorLabel}</ColorLabel>}
              </Info>
            </ItemLink>
            <RemoveButton
              type="button"
              onClick={() => handleRemove(item)}
              aria-label={`${item.name} 위시리스트에서 삭제`}
            >
              <RemoveIcon src={xIcon} alt="" aria-hidden />
            </RemoveButton>
          </Row>
        ))}
      </List>
    </AccountDetailLayout>
  );
}

export default Wishlist;

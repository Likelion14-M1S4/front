import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { getWishlist, removeWishlistItem } from '../../api/wishlist';
import xIcon from '../../assets/icons/nav/Xicon.svg';

// 위시리스트 목록 — Title의 기본 margin-bottom(16px) + margin-top 24px = 구분선과 40px 간격
// AccountDetailLayout의 좌우 20px 패딩을 상쇄하고 24px로 재적용
const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px -20px 0;
  padding: 0 24px;
`;

// 위시리스트 항목 1개 — 마지막 항목 아래 여백 없음
const Row = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Thumbnail = styled.img`
  width: 96px;
  height: 96px;
  flex-shrink: 0;
  background: #f6f4f2;
  object-fit: cover;
`;

// 상품명/색상 — 썸네일과 31px 간격, X 아이콘과 겹치지 않게 오른쪽 여백 확보
const Info = styled.div`
  flex: 1;
  min-width: 0;
  margin-left: 31px;
  padding-right: 24px;
`;

const Name = styled.p`
  margin: 0;
  overflow: hidden;
  color: black;
  font-size: 16px;
  font-family: 'SD Minburi';
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// 색상 라벨 — 상품명과 4px 간격
const ColorLabel = styled.p`
  margin: 4px 0 0;
  color: #999999;
  font-size: 14px;
  font-family: 'SD Minburi';
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
  width: 16px;
  height: 16px;
  filter: invert(1);
`;

// 위시리스트가 비어있을 때 — 구분선과 40px 간격 (목록과 동일)
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

// 위시리스트 페이지 — 찜한 상품 목록을 보여줌
function Wishlist() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWishlist().then((data) => {
      setItems(data);
      setIsLoading(false);
    });
  }, []);

  // 위시리스트에서 제거
  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    removeWishlistItem(id);
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
            <Thumbnail src={item.imageUrl} alt={item.name} />
            <Info>
              <Name>{item.name}</Name>
              <ColorLabel>{item.colorLabel}</ColorLabel>
            </Info>
            <RemoveButton
              type="button"
              onClick={() => handleRemove(item.id)}
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

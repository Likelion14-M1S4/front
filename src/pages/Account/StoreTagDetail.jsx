import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { getStoreTagDetail } from '../../api/storeTagDetail';
import plusIcon from '../../assets/icons/nav/plus_icon.svg';
import minusIcon from '../../assets/icons/nav/minus_arrow.svg';

// AccountDetailLayout의 좌우 20px 패딩을 상쇄하고 24px로 재적용
const Body = styled.div`
  margin: 0 -20px;
  padding: 0 24px 40px;
`;

// 매장명 + 태그 제품 추가 버튼 — 구분선과 76px 간격
const StoreNameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 76px;
`;

const StoreName = styled.p`
  margin: 0;
  color: black;
  font-size: 20px;
  font-family: 'SD Minburi';
  font-weight: 500;
`;

// 매장 정보 펼치기/접기 토글 — 아이콘이 바뀌어도 위치가 고정되도록 24x24 고정
const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const PlusIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const MinusIcon = styled.img`
  width: 14px;
  height: 2px;
`;

// 매장 주소 — 매장명과 28px 간격
const Address = styled.p`
  margin: 28px 0 0;
  color: black;
  font-size: 14px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

// 매장 전화번호 — 주소와 4px 간격
const Phone = styled.p`
  margin: 4px 0 0;
  color: black;
  font-size: 14px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

// 요일별 운영시간 목록 — 전화번호와 20px 간격
const HoursList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

// 요일 + 운영시간 한 블록 — 다음 블록과 4px 간격
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

// 매장 내 태그 제품 — 매장명과 56px 간격
const SectionTitle = styled.p`
  margin: 56px 0 0;
  color: black;
  font-size: 16px;
  font-family: 'SD Minburi';
  font-weight: 500;
`;

// 날짜별 태그 제품 묶음 목록 — 섹션 제목과 24px 간격
const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

// 그룹 1개 — 다음 그룹과 36px 간격
const Group = styled.div`
  margin-bottom: 36px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DateLabel = styled.p`
  margin: 0;
  color: black;
  font-size: 14px;
  font-family: 'SD Minburi';
  font-weight: 400;
`;

// 제품 목록 — 날짜와 8px 간격, 화면 밖으로 넘치면 옆으로 스크롤
const ProductRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProductCard = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`;

const Thumbnail = styled.img`
  width: 96px;
  height: 96px;
  background: #f6f4f2;
  object-fit: cover;
`;

// 제품명 — 사진과 12px 간격
const ProductName = styled.p`
  margin: 12px 0 0;
  width: 96px;
  overflow: hidden;
  color: black;
  font-size: 13px;
  font-family: 'SD Minburi';
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// 매장 태그 상세 페이지 — 매장 태그 이력에서 매장을 누르면 이동
function StoreTagDetail() {
  const { storeId } = useParams();
  const [detail, setDetail] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    getStoreTagDetail(storeId).then(setDetail);
  }, [storeId]);

  if (!detail) return null;

  return (
    <AccountDetailLayout>
      <Body>
        <StoreNameRow>
          <StoreName>{detail.storeName}</StoreName>
          <ToggleButton
            type="button"
            onClick={() => setIsInfoOpen((prev) => !prev)}
            aria-label={isInfoOpen ? '매장 정보 접기' : '매장 정보 펼치기'}
          >
            {isInfoOpen ? (
              <MinusIcon src={minusIcon} alt="" aria-hidden />
            ) : (
              <PlusIcon src={plusIcon} alt="" aria-hidden />
            )}
          </ToggleButton>
        </StoreNameRow>

        {isInfoOpen ? (
          <>
            <Address>{detail.address}</Address>
            <Phone>{detail.phone}</Phone>
            <HoursList>
              {detail.hours.map((item) => (
                <HoursRow key={item.day}>
                  <span>{item.day}</span>
                  <span>{item.time}</span>
                </HoursRow>
              ))}
            </HoursList>
          </>
        ) : null}

        <SectionTitle>매장 내 태그 제품</SectionTitle>

        <GroupList>
          {detail.taggedGroups.map((group, index) => (
            <Group key={`${group.date}-${index}`}>
              <DateLabel>{group.date}</DateLabel>
              <ProductRow>
                {group.products.map((product) => (
                  <ProductCard key={product.id}>
                    <Thumbnail src={product.imageUrl} alt={product.name} />
                    <ProductName>{product.name}</ProductName>
                  </ProductCard>
                ))}
              </ProductRow>
            </Group>
          ))}
        </GroupList>
      </Body>
    </AccountDetailLayout>
  );
}

export default StoreTagDetail;

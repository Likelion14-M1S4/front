import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { getAvailableCharms } from '../../api/availableCharms';
import belowArrow from '../../assets/icons/nav/below_arrow.svg';

// 컬렉션 선택 버튼 — 구분선과는 Title의 기본 margin-bottom(16px)으로 간격 확보
const CollectionSelect = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 35px;
  padding: 0;
  border: 1px solid #ffffff;
  background: none;
  color: black;
  font-size: 16px;
  font-family: 'SD Minburi';
  font-weight: 400;
  cursor: pointer;
`;

const ChevronIcon = styled.img`
  width: 16px;
  height: 15px;
`;

// 참 그리드 — 컬렉션 선택 버튼과 24px 간격
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 14px;
  row-gap: 32px;
  margin-top: 24px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #f6f4f2;
  object-fit: cover;
`;

// 참 이름 — 썸네일과 16px 간격
const CharmName = styled.p`
  margin: 16px 0 0;
  overflow: hidden;
  color: black;
  font-size: 16px;
  font-family: 'SD Minburi';
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// 소속 컬렉션 — 참 이름과 8px 간격
const CharmCollection = styled.p`
  margin: 8px 0 0;
  overflow: hidden;
  color: #C4B1A4;
  font-size: 13px;
  font-family: 'SD Minburi';
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// 구매 가능한 참 페이지 — 시즌 한정 참 중 구매 가능한 목록을 보여줌
function AvailableCharms() {
  const [page, setPage] = useState({ collectionName: '', charms: [] });

  useEffect(() => {
    getAvailableCharms().then(setPage);
  }, []);

  return (
    <AccountDetailLayout title="구매 가능한 참">
      {/* TODO: 컬렉션 목록 드롭다운 연결 */}
      <CollectionSelect type="button">
        {page.collectionName}
        <ChevronIcon src={belowArrow} alt="" aria-hidden />
      </CollectionSelect>

      <Grid>
        {page.charms.map((charm) => (
          <Card key={charm.id}>
            <Thumbnail src={charm.imageUrl} alt={charm.name} />
            <CharmName>{charm.name}</CharmName>
            <CharmCollection>{charm.collectionName}</CharmCollection>
          </Card>
        ))}
      </Grid>
    </AccountDetailLayout>
  );
}

export default AvailableCharms;

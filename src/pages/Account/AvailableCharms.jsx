import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { getAvailableCharms } from '../../api/availableCharms';
import { charmCollectionOptions } from '../../mock/charmCollectionOptions';
import belowArrow from '../../assets/icons/nav/below_arrow.svg';

// 옵션 목록이 뜰 때 기준이 되는 위치 앵커
const SelectorWrapper = styled.div`
    position: relative;
`;

// 컬렉션 선택 버튼 — 구분선과는 Title의 기본 margin-bottom(16px)으로 간격 확보
const CollectionSelect = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 35px;
    padding: 0;
    border: 1px solid #F6F4F2;
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
    transition: transform 0.2s ease;
    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

// 컬렉션 선택 버튼을 누르면 나오는 옵션 목록 — 아래 그리드를 밀어내지 않도록 그 위에 띄움
const OptionList = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    background: #f2f2f2;
`;

const OptionItem = styled.button`
    width: 100%;
    padding: 5px 0 7px;
    border: none;
    background: none;
    color: black;
    font-size: 14px;
    font-family: 'SD Minburi';
    font-weight: 400;
    text-align: left;
    cursor: pointer;
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

// 구매 가능한 참이 없을 때
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

// 스토리 링크 — 안내 문구와 40px 간격
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

// 구매 가능한 참 페이지 — 시즌 한정 참 중 구매 가능한 목록을 보여줌
function AvailableCharms() {
  const [page, setPage] = useState({ collectionName: '', charms: [] });
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAvailableCharms().then((data) => {
      setPage(data);
      setIsLoading(false);
    });
  }, []);

  // 옵션 선택 — TODO: 선택한 컬렉션으로 참 목록 다시 조회
  const handleSelectOption = (option) => {
    setPage((prev) => ({ ...prev, collectionName: option }));
    setIsOptionListOpen(false);
  };

  if (!isLoading && page.charms.length === 0) {
    return (
      <AccountDetailLayout title="구매 가능한 참">
        <EmptyState>
          <EmptyTitle>현재 구매 가능한 참이 없습니다.</EmptyTitle>
          <EmptySubtitle>스토리를 진행하고 다시 확인해보세요.</EmptySubtitle>
          <EmptyLink to="/story">스토리 보러가기</EmptyLink>
        </EmptyState>
      </AccountDetailLayout>
    );
  }

  return (
    <AccountDetailLayout title="구매 가능한 참">
      <SelectorWrapper>
        <CollectionSelect
          type="button"
          onClick={() => setIsOptionListOpen((prev) => !prev)}
        >
          {page.collectionName}
          <ChevronIcon src={belowArrow} alt="" aria-hidden $open={isOptionListOpen} />
        </CollectionSelect>

        {isOptionListOpen ? (
          <OptionList>
            {charmCollectionOptions.map((option) => (
              <OptionItem
                key={option}
                type="button"
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </OptionItem>
            ))}
          </OptionList>
        ) : null}
      </SelectorWrapper>

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

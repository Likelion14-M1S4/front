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

// 컬렉션 선택 버튼 — 구분선과는 Title의 기본 margin-bottom(1rem)으로 간격 확보
const CollectionSelect = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 2.1875rem;
    padding: 0;
    border: 1px solid #F6F4F2;
    background: none;
    color: black;
    font-size: 1rem;
    font-family: 'Pretendard';
    font-weight: 400;
    cursor: pointer;
`;

const ChevronIcon = styled.img`
    width: 1rem;
    height: 0.9375rem;
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
    padding: 0.3125rem 0 0.4375rem;
    border: none;
    background: none;
    color: black;
    font-size: 0.875rem;
    font-family: 'Pretendard';
    font-weight: 400;
    text-align: left;
    cursor: pointer;
`;

// 참 그리드 — 컬렉션 선택 버튼과 1.5rem 간격
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 0.875rem;
    row-gap: 2rem;
    margin-top: 1.5rem;
`;

const Card = styled(Link)`
    display: flex;
    flex-direction: column;
`;

const Thumbnail = styled.img`
    width: 100%;
    aspect-ratio: 1 / 1;
    background: #f6f4f2;
    object-fit: cover;
`;

// 참 이름 — 썸네일과 1rem 간격
const CharmName = styled.p`
    margin: 1rem 0 0;
    overflow: hidden;
    color: black;
    font-size: 1rem;
    font-family: 'Pretendard';
    font-weight: 500;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

// 소속 컬렉션 — 참 이름과 0.5rem 간격
const CharmCollection = styled.p`
    margin: 0.5rem 0 0;
    overflow: hidden;
    color: #C4B1A4;
    font-size: 0.8125rem;
    font-family: 'Pretendard';
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

// 선택한 컬렉션에 해당하는 참이 없을 때
const NoResultText = styled.p`
    margin: 3rem 0 0;
    text-align: center;
    color: #8a7a6c;
    font-size: 0.875rem;
    font-family: 'Pretendard';
`;

// 구매 가능한 참이 없을 때
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

// 스토리 링크 — 안내 문구와 2.5rem 간격
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

// 구매 가능한 참 페이지 — 시즌 한정 참 중 구매 가능한 목록을 보여줌
function AvailableCharms() {
  const [allCharms, setAllCharms] = useState([]);
  const [collectionName, setCollectionName] = useState(charmCollectionOptions[0]);
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAvailableCharms().then((data) => {
      setAllCharms(data.charms);
      setIsLoading(false);
    });
  }, []);

  // 옵션 선택 — 선택한 컬렉션으로 참 목록을 필터링
  const handleSelectOption = (option) => {
    setCollectionName(option);
    setIsOptionListOpen(false);
  };

  const charms =
    collectionName === '전체 보기'
      ? allCharms
      : allCharms.filter((charm) => charm.collectionName === collectionName);

  if (!isLoading && allCharms.length === 0) {
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
          {collectionName}
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

      {charms.length > 0 ? (
        <Grid>
          {charms.map((charm) => (
            <Card key={charm.id} to={`/season/${charm.id}`}>
              <Thumbnail src={charm.imageUrl} alt={charm.name} />
              <CharmName>{charm.name}</CharmName>
              <CharmCollection>{charm.collectionName}</CharmCollection>
            </Card>
          ))}
        </Grid>
      ) : (
        <NoResultText>해당 컬렉션에 구매 가능한 참이 없습니다.</NoResultText>
      )}
    </AccountDetailLayout>
  );
}

export default AvailableCharms;

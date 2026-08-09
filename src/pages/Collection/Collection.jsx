import { Link } from 'react-router-dom';
import styled from 'styled-components';
import hamburgerIcon from '../../assets/icons/nav/header/hamburger.svg';
import { useCollectedCharacters } from '../../hooks/useCollectedCharacters';
const Page = styled.div`
  padding: 8px 16px 40px;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #000000;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
`;

const MenuIcon = styled.img`
  width: 18px;
  height: 12px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 64px;
`;

const Card = styled(Link)`
  display: block;
  text-align: center;
`;

const Cover = styled.div`
  width: 240px;
  height: 252px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 0;
  background: #f2f2f2;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Divider = styled.span`
  display: block;
  width: 78px;
  height: ${({ $thin }) => ($thin ? '2.5px' : '3px')};
  margin: 32px auto 16px;
  border-radius: 9999px;
  background-color: #6F5B4D;
`;

const Name = styled.h2`
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.04em;
  color: #c4b1a4;
`;

const CharacterName = styled.p`
  margin: 2px 0 0;
  font-size: 11px;
  font-weight: 300;
  line-height: 16px;
  color: #000000;
`;

const Status = styled.p`
  margin: 40px 0 0;
  text-align: center;
  font-size: 14px;
  color: #8a7a6c;
`;

// 사용자가 수집한 캐릭터만 보여주는 갤러리 페이지
// 텍스트·이미지는 GET /api/characters/collected 응답 필드를 그대로 사용
// - collectionName: 영문 컬렉션명 (예: MCM BASIC COLLECTION)
// - name: 캐릭터명 (예: 비세토스 라이언)
function Collection() {
  const { characters, isLoading, error } = useCollectedCharacters();

  return (
    <Page>
      <PageHeader>
        <PageTitle>갤러리</PageTitle>
        <MenuButton type="button" aria-label="메뉴 열기">
          <MenuIcon src={hamburgerIcon} alt="" aria-hidden />
        </MenuButton>
      </PageHeader>

      {isLoading ? <Status>불러오는 중...</Status> : null}
      {error ? <Status>캐릭터를 불러오지 못했습니다.</Status> : null}
      {!isLoading && !error && characters.length === 0 ? (
        <Status>아직 수집한 캐릭터가 없습니다.</Status>
      ) : null}

      {!isLoading && !error && characters.length > 0 ? (
        <List>
          {characters.map((item, index) => {
            const isEdge = index === 0 || index === characters.length - 1;

            return (
              <li key={item.id}>
                <Card to={`/collection/${item.id}`}>
                  <Cover>
                    {item.thumbnailUrl ? (
                      <CoverImage src={item.thumbnailUrl} alt={item.name} />
                    ) : null}
                  </Cover>
                  <Divider $thin={isEdge} aria-hidden />
                  <Name>{item.collectionName}</Name>
                  <CharacterName>{item.name}</CharacterName>
                </Card>
              </li>
            );
          })}
        </List>
      ) : null}
    </Page>
  );
}

export default Collection;

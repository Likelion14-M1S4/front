import { Link } from 'react-router-dom';
import styled from 'styled-components';
import hamburgerIcon from '../../assets/icons/nav/header/hamburger.svg';
import { useCollectedCharacters } from '../../hooks/useCollectedCharacters';
const Page = styled.div`
  padding: 0.5rem 1rem 2.5rem;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
`;

const MenuIcon = styled.img`
  width: 1.125rem;
  height: 0.75rem;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Card = styled(Link)`
  display: block;
  text-align: center;
`;

const Cover = styled.div`
  width: 15rem;
  height: 15.75rem;
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
  width: 4.875rem;
  height: ${({ $thin }) => ($thin ? '0.15625rem' : '0.1875rem')};
  margin: 2rem auto 1rem;
  border-radius: 9999px;
  background-color: #6F5B4D;
`;

const Name = styled.h2`
  margin: 0;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem;
  letter-spacing: 0.04em;
  color: #c4b1a4;
`;

const CharacterName = styled.p`
  margin: 0.125rem 0 0;
  font-size: 0.6875rem;
  font-weight: 300;
  line-height: 1rem;
  color: #000000;
`;

const Status = styled.p`
  margin: 2.5rem 0 0;
  text-align: center;
  font-size: 0.875rem;
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
        {/* <MenuButton type="button" aria-label="메뉴 열기">
          <MenuIcon src={hamburgerIcon} alt="" aria-hidden />
        </MenuButton> */} 
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

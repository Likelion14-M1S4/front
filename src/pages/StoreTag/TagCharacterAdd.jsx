import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getTaggedCharacter, addCharacterToCollection } from '../../api/tagCharacterAdd';

// 헤더/네비게이션 없이 흰 배경으로 꽉 채우는 페이지
const Page = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  padding-bottom: 12.25rem;
  background: #ffffff;
`;

// 캐릭터 사진 — 페이지 맨 위에서 4.4375rem, 좌우 1.5625rem씩
// width/height를 고정하지 않고 aspect-ratio로 비율만 유지해, 프레임이 390px보다 커져도 폭에 맞춰 늘어남
const Thumbnail = styled.img`
  width: calc(100% - 3.125rem);
  aspect-ratio: 340 / 397;
  margin: 4.4375rem 1.5625rem 0;
  background: #f6f4f2;
  object-fit: cover;
`;

// 캐릭터 이름 — 사진과 2.0625rem 간격, 좌우 7.3125rem씩
const CharacterName = styled.h1`
  margin: 2.0625rem 7.3125rem 0;
  color: black;
  font-size: 1.5rem;
  font-family: 'Pretendard';
  font-weight: 500;
  text-align: center;
`;

// 시즌 이름 — 캐릭터 이름과 0.5rem 간격, 좌우 6.125rem씩
const CollectionName = styled.p`
  margin: 0.5rem 6.125rem 0;
  color: black;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 400;
  text-align: center;
`;

// 캐릭터 성격/특징 — 시즌 이름과 2.0625rem 간격, 좌우 1.25rem씩
const Description = styled.p`
  margin: 2.0625rem 1.25rem 0;
  color: black;
  font-size: 0.875rem;
  font-family: 'Pretendard';
  font-weight: 400;
  line-height: 1.6;
  text-align: left;
`;

// 컬렉션에 추가 버튼 — 정품 인증서 페이지의 다음 버튼과 화면상 같은 위치에 겹치도록 페이지 하단에 고정
const AddButton = styled.button`
  position: absolute;
  left: 1.5rem;
  right: 1.5rem;
  bottom: 7.25rem;
  height: 3.5rem;
  border: none;
  border-radius: 5px;
  background: #1E1E1E;
  color: #ffffff;
  font-size: 1.25rem;
  font-family: 'Pretendard';
  font-weight: 500;
  cursor: pointer;
`;

// 태그 캐릭터를 컬렉션에 추가하는 페이지 — 정품 인증서 화면 다음, 로그인 화면 이전에 노출
function TagCharacterAdd() {
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    getTaggedCharacter().then(setCharacter);
  }, []);

  if (!character) return null;

  const handleAdd = () => {
    addCharacterToCollection(character.id).then(() => {
      navigate('/login');
    });
  };

  return (
    <Page>
      <Thumbnail src={character.imageUrl} alt={character.name} />

      <CharacterName>{character.name}</CharacterName>
      <CollectionName>{character.collectionName}</CollectionName>

      <Description>{character.description}</Description>

      <AddButton type="button" onClick={handleAdd}>
        컬렉션에 추가
      </AddButton>
    </Page>
  );
}

export default TagCharacterAdd;

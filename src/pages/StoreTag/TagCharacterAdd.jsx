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
  padding-bottom: 196px;
  background: #ffffff;
`;

// 캐릭터 사진 — 페이지 맨 위에서 71px, 340x397, 좌우 25px씩
const Thumbnail = styled.img`
  width: 340px;
  height: 397px;
  margin: 71px 25px 0;
  background: #f6f4f2;
  object-fit: cover;
`;

// 캐릭터 이름 — 사진과 33px 간격, 좌우 117px씩
const CharacterName = styled.h1`
  margin: 33px 117px 0;
  color: black;
  font-size: 24px;
  font-family: 'SD Minburi';
  font-weight: 500;
  text-align: center;
`;

// 시즌 이름 — 캐릭터 이름과 8px 간격, 좌우 98px씩
const CollectionName = styled.p`
  margin: 8px 98px 0;
  color: black;
  font-size: 16px;
  font-family: 'SD Minburi';
  font-weight: 400;
  text-align: center;
`;

// 캐릭터 성격/특징 — 시즌 이름과 33px 간격, 좌우 20px씩
const Description = styled.p`
  margin: 33px 20px 0;
  color: black;
  font-size: 14px;
  font-family: 'SD Minburi';
  font-weight: 400;
  line-height: 1.6;
  text-align: left;
`;

// 컬렉션에 추가 버튼 — 정품 인증서 페이지의 다음 버튼과 화면상 같은 위치에 겹치도록 페이지 하단에 고정
const AddButton = styled.button`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 140px;
  height: 56px;
  border: none;
  border-radius: 5px;
  background: #1E1E1E;
  color: #ffffff;
  font-size: 20px;
  font-family: 'SD Minburi';
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

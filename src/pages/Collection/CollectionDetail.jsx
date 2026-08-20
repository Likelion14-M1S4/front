import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineChevronDown } from 'react-icons/hi';
import BackHeader from '../../components/common/Header/BackHeader';
import chatIcon from '../../assets/icons/nav/chat.svg';
import { useCollectedCharacterDetail } from '../../hooks/useCollectedCharacterDetail';

const ChatLinkButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 1.25rem;
  padding: 0.875rem 1rem;
  border-radius: 10px;
  background: #000000;
  color: #ffffff;
  font-size: 0.9375rem;
  font-weight: 500;

  img {
    display: block;
    width: 1.25rem;
    height: 1.1875rem;
  }
`;

const Page = styled.div`
  padding: 0 0 2.5rem;
`;

const Hero = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  aspect-ratio: 1 / 1;
  background: #f2f2f2;
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Intro = styled.div`
  padding: 1.5rem 1.25rem 0;
`;

const CharacterName = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: #000000;
`;

const CollectionName = styled.p`
  margin: 0.5rem 0 0;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  text-align: center;
  color: #8a7a6c;
`;

const CollectionSubtitle = styled.p`
  margin: 0.25rem 0 0;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  color: #8a7a6c;
`;

const Description = styled.p`
  margin: 1rem 0 0;
  font-size: 0.875rem;
  line-height: 1.7;
  text-align: left;
  color: #000000;
`;

const Accordion = styled.div`
  margin-top: 1.75rem;
  border-top: 1px solid #e8e2dc;
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid #e8e2dc;
`;

const AccordionHeader = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1.125rem 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  color: #333333;
  text-align: left;
`;

const Chevron = styled(HiOutlineChevronDown)`
  flex-shrink: 0;
  color: #8a7a6c;
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? 'rotate(0deg)' : 'rotate(-90deg)')};
`;

const AccordionBody = styled.div`
  padding: 0 1.25rem 1.25rem;
`;

const PanelText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.7;
  color: #666666;
`;

const Empty = styled.div`
  padding: 2.5rem 1.25rem;
  text-align: center;
  font-size: 0.875rem;
  color: #8a7a6c;
`;

// 수집한 캐릭터 상세 페이지
function CollectionDetail() {
  const { characterId } = useParams();
  const { character, isLoading } = useCollectedCharacterDetail(characterId);
  const [openSection, setOpenSection] = useState(null);

  if (isLoading) {
    return (
      <Page>
        <BackHeader />
        <Empty>불러오는 중...</Empty>
      </Page>
    );
  }

  if (!character) {
    return (
      <Page>
        <BackHeader />
        <Empty>수집한 캐릭터를 찾을 수 없습니다.</Empty>
      </Page>
    );
  }

  const sections = character.sections ?? [];

  const toggle = (key) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  return (
    <Page>
      <BackHeader />

      <Hero>
        {character.imageUrl ? (
          <HeroImage src={character.imageUrl} alt={character.name} />
        ) : null}
      </Hero>

      <Intro>
        <CharacterName>{character.name}</CharacterName>
        {character.collectionName ? (
          <CollectionName>{character.collectionName}</CollectionName>
        ) : null}
        {character.collectionSubtitle ? (
          <CollectionSubtitle>{character.collectionSubtitle}</CollectionSubtitle>
        ) : null}
        {character.description ? (
          <Description>{character.description}</Description>
        ) : null}
        <ChatLinkButton to={`/collection/${character.characterId}/chat`}>
          <img src={chatIcon} alt="" />
          캐릭터와 대화하기
        </ChatLinkButton>
      </Intro>

      <Accordion>
        {sections.map((section) => {
          const isOpen = openSection === section.type;

          return (
            <AccordionItem key={section.type}>
              <AccordionHeader type="button" onClick={() => toggle(section.type)}>
                {section.title}
                <Chevron size={18} $open={isOpen} />
              </AccordionHeader>

              {isOpen ? (
                <AccordionBody>
                  <PanelText>{section.content}</PanelText>
                </AccordionBody>
              ) : null}
            </AccordionItem>
          );
        })}
      </Accordion>
    </Page>
  );
}

export default CollectionDetail;

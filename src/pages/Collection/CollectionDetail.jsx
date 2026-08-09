import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineChevronDown } from 'react-icons/hi';
import chatIcon from '../../assets/icons/nav/chat.svg';
import { useCollectedCharacterDetail } from '../../hooks/useCollectedCharacterDetail';

const ChatLinkButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 20px;
  padding: 14px 16px;
  border-radius: 10px;
  background: #000000;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;

  img {
    display: block;
    width: 20px;
    height: 19px;
  }
`;

const Page = styled.div`
  padding: 0 0 40px;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 12px;
  border-bottom: 1px solid #e8e2dc;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  font-size: 28px;
  line-height: 1;
  color: #6f5b4d;
`;

const Hero = styled.div`
  width: 100%;
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
  padding: 24px 20px 0;
`;

const CharacterName = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: #000000;
`;

const CollectionName = styled.p`
  margin: 8px 0 0;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.04em;
  text-align: center;
  color: #8a7a6c;
`;

const CollectionSubtitle = styled.p`
  margin: 4px 0 0;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  color: #8a7a6c;
`;

const Description = styled.p`
  margin: 16px 0 0;
  font-size: 14px;
  line-height: 1.7;
  text-align: left;
  color: #000000;
`;

const Accordion = styled.div`
  margin-top: 28px;
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
  padding: 18px 20px;
  font-size: 16px;
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
  padding: 0 20px 20px;
`;

const PanelText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductImage = styled.div`
  width: 347px;
  height: 342px;
  margin: 0 auto;
  overflow: hidden;
  background: #f2f2f2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 12px;
`;

const ProductRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

const ProductName = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  color: #333333;
`;

const DetailLink = styled.a`
  font-size: 12px;
  color: #8a7a6c;
  white-space: nowrap;
`;

const ProductColor = styled.p`
  margin: 0;
  font-size: 13px;
  color: #8a7a6c;
`;

const Empty = styled.div`
  padding: 40px 20px;
  text-align: center;
  font-size: 14px;
  color: #8a7a6c;
`;

// 수집한 캐릭터 상세 페이지
function CollectionDetail() {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const { character, isLoading } = useCollectedCharacterDetail(characterId);
  const [openSection, setOpenSection] = useState(null);

  if (isLoading) {
    return (
      <Page>
        <TopBar>
          <BackButton type="button" aria-label="뒤로가기" onClick={() => navigate(-1)}>
            ‹
          </BackButton>
        </TopBar>
        <Empty>불러오는 중...</Empty>
      </Page>
    );
  }

  if (!character) {
    return (
      <Page>
        <TopBar>
          <BackButton type="button" aria-label="뒤로가기" onClick={() => navigate(-1)}>
            ‹
          </BackButton>
        </TopBar>
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
      <TopBar>
        <BackButton type="button" aria-label="뒤로가기" onClick={() => navigate(-1)}>
          ‹
        </BackButton>
      </TopBar>

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
        <ChatLinkButton to={`/collection/${character.id}/chat`}>
          <img src={chatIcon} alt="" />
          캐릭터와 대화하기
        </ChatLinkButton>
      </Intro>

      {/* sections: API 배열 — character / product / care 모두 서버 title·content·items 사용 */}
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
                  {section.type === 'product' ? (
                    (section.items?.length ?? 0) > 0 ? (
                      section.items.map((product) => (
                        <ProductCard key={product.id}>
                          <ProductImage>
                            {product.imageUrl ? (
                              <img src={product.imageUrl} alt={product.name} />
                            ) : null}
                          </ProductImage>
                          <ProductMeta>
                            <ProductRow>
                              <ProductName>{product.name}</ProductName>
                              {product.detailUrl ? (
                                <DetailLink
                                  href={product.detailUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  자세히보기
                                </DetailLink>
                              ) : null}
                            </ProductRow>
                            {product.color ? (
                              <ProductColor>색상:{product.color}</ProductColor>
                            ) : null}
                          </ProductMeta>
                        </ProductCard>
                      ))
                    ) : (
                      <PanelText>등록된 제품이 없습니다.</PanelText>
                    )
                  ) : (
                    <PanelText>{section.content}</PanelText>
                  )}
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

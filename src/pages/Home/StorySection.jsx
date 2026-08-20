import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { featuredStory } from '../../mock/story';
import { SECTION_GAP_REM } from '../../styles/theme';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${SECTION_GAP_REM}rem;
  padding-bottom: 0;
`;

const StoryLink = styled(Link)`
  display: block;
  width: 19.25rem;
  height: 12.8125rem;
  overflow: hidden;
  border-radius: 10px;
  background: #f2f2f2;
`;

const StoryImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const TextBlock = styled.div`
  margin: 1rem 0 0;
  width: 19.25rem;
  text-align: left;
  box-sizing: border-box;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: left;
  color: #000000;
`;

const Description = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.875rem;
  line-height: 1.625;
  text-align: left;
  color: #000000;
`;

// 홈 화면 스토리 섹션 (이미지 + 텍스트)
function StorySection() {
  return (
    <Section>
      <StoryLink to={featuredStory.linkTo}>
        {featuredStory.imageUrl ? (
          <StoryImage src={featuredStory.imageUrl} alt={featuredStory.title} />
        ) : null}
      </StoryLink>

      <TextBlock>
        <Title>{featuredStory.title}</Title>
        <Description>{featuredStory.description}</Description>
      </TextBlock>
    </Section>
  );
}

export default StorySection;

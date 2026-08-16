import styled from 'styled-components';
import { pastSeasonStories } from '../../mock/story';

const Section = styled.section`
  width: 100%;
  margin-top: 17.25rem;
`;

// 섹션 제목 (예: 지난 시즌 스토리)
const Title = styled.h2`
  margin: 0 0 2rem;
  text-align: center;
  color: black;
  font-size: 1.5rem;
  font-family: 'Pretendard';
  font-weight: 500;
  line-height: 1.421875rem;
  word-wrap: break-word;
`;

// 가로 스크롤 카드 목록 — 좌우 패딩(1.25rem)을 상쇄해 카드가 화면 끝까지 이어지도록 함
const List = styled.div`
  display: flex;
  gap: 0.875rem;
  margin: 0 -1.25rem;
  padding: 0 1.25rem;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// 카드 너비를 고정해 다음 카드가 화면 끝에 살짝 걸쳐 보이도록 함 (스크롤 유도)
const Card = styled.div`
  flex: 0 0 15.25rem;
  width: 15.25rem;
`;

const Cover = styled.div`
  width: 15.25rem;
  height: 23.25rem;
  overflow: hidden;
  background: #f2f2f2;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 카드 하단 캡션 (스토리 제목)
const CardTitle = styled.p`
  margin: 1rem 0 0;
  color: black;
  font-size: 1rem;
  font-family: 'Pretendard';
  font-weight: 500;
  line-height: 1.421875rem;
  word-wrap: break-word;
`;


// 지난 시즌 스토리 목록 (가로 스크롤 카드)
function PastSeasonStorySection() {
  return (
    <Section>
      <Title>지난 시즌 스토리</Title>
      <List>
        {pastSeasonStories.map((item) => (
          <Card key={item.id}>
            <Cover>
              {item.imageUrl ? <CoverImage src={item.imageUrl} alt={item.title} /> : null}
            </Cover>
            <CardTitle>{item.title}</CardTitle>
          </Card>
        ))}
      </List>
    </Section>
  );
}

export default PastSeasonStorySection;
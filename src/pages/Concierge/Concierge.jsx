import styled from 'styled-components';

const Page = styled.div`
  padding: 1.5rem 1.25rem 2.5rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
`;

// 컨시어지 페이지 (추후 UI 구현 예정)
function Concierge() {
  return (
    <Page>
      <Title>컨시어지</Title>
    </Page>
  );
}

export default Concierge;

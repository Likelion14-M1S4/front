import styled from 'styled-components';

const Page = styled.div`
  padding: 24px 20px 40px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
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

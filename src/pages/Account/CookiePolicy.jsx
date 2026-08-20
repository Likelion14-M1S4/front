import styled from 'styled-components';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { cookiePolicyPage } from '../../mock/cookiePolicy';

const Body = styled.p`
  margin: 0 0 2.5rem;
  color: #000000;
  font-size: 0.8125rem;
  font-family: 'Pretendard';
  font-weight: 400;
  line-height: 1.7;
  white-space: pre-line;
`;

function CookiePolicy() {
  return (
    <AccountDetailLayout title={cookiePolicyPage.title}>
      <Body>{cookiePolicyPage.body}</Body>
    </AccountDetailLayout>
  );
}

export default CookiePolicy;

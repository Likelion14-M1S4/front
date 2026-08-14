import styled from 'styled-components';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { termsOfServicePage } from '../../mock/termsOfService';

const Body = styled.p`
  margin: 0 0 2.5rem;
  color: #000000;
  font-size: 0.8125rem;
  font-family: 'SD Minburi';
  font-weight: 400;
  line-height: 1.7;
  white-space: pre-line;
`;

function TermsOfService() {
  return (
    <AccountDetailLayout title={termsOfServicePage.title}>
      <Body>{termsOfServicePage.body}</Body>
    </AccountDetailLayout>
  );
}

export default TermsOfService;

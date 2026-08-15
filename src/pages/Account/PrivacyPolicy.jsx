import { useState } from 'react';
import styled from 'styled-components';
import AccountDetailLayout from '../../components/Layout/AccountDetailLayout';
import { privacyPolicyPage } from '../../mock/privacyPolicy';

const Intro = styled.p`
  margin: 0 0 1.75rem;
  color: #000000;
  font-size: 0.875rem;
  font-family: 'SD Minburi';
  font-weight: 400;
  line-height: 1.7;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 -1.25rem;
  padding-bottom: 2.5rem;
`;

const Item = styled.div`
  border-bottom: 1px solid #e5e4e7;
`;

const Toggle = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.125rem 1.5rem;
  color: #000000;
  font-size: 1rem;
  font-family: 'SD Minburi';
  font-weight: 400;
  text-align: left;
`;

const Plus = styled.span`
  flex-shrink: 0;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1;
`;

const Body = styled.div`
  padding: 0 1.5rem 1.25rem;
  background: #f6f4f2;
`;

const BodyText = styled.p`
  margin: 0;
  padding: 1.25rem 0;
  color: #000000;
  font-size: 0.8125rem;
  font-family: 'SD Minburi';
  font-weight: 400;
  line-height: 1.7;
  white-space: pre-line;
`;

function PrivacyPolicy() {
  const { title, intro, articles } = privacyPolicyPage;
  const [openId, setOpenId] = useState('');

  return (
    <AccountDetailLayout title={title}>
      {intro ? <Intro>{intro}</Intro> : null}
      <List>
        {articles.map((article) => {
          const isOpen = openId === article.id;

          return (
            <Item key={article.id}>
              <Toggle
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? '' : article.id)}
              >
                <span>{article.title}</span>
                <Plus aria-hidden>{isOpen ? '−' : '+'}</Plus>
              </Toggle>
              {isOpen ? (
                <Body>
                  <BodyText>{article.body}</BodyText>
                </Body>
              ) : null}
            </Item>
          );
        })}
      </List>
    </AccountDetailLayout>
  );
}

export default PrivacyPolicy;

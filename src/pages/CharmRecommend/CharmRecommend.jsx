import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BackHeader from '../../components/common/Header/BackHeader';
import { useCharmRecommendPage } from '../../hooks/useCharmRecommendPage';
import line2Icon from '../../assets/icons/recommend/line2.svg';
import { APP_WIDTH } from '../../styles/theme';

const CONTENT_X = 20;
const SECTION_GAP = 72;

const Page = styled.div`
  width: 100%;
  max-width: ${APP_WIDTH}px;
  margin: 0 auto;
  padding: 0 0 48px;
  box-sizing: border-box;
  background: #ffffff;
`;

const Hero = styled.div`
  width: 342px;
  height: 327px;
  margin: 24px auto 0;
  background: #f2f2f2;
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Intro = styled.div`
  padding: 18px ${CONTENT_X}px 0;
  text-align: center;
`;

const Name = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 400;
  line-height: 1.3;
  color: #000000;
`;

const CollectionName = styled.p`
  margin: 8px 0 0;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: #c4b1a4;
`;

const Description = styled.p`
  margin: 28px 0 0;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.7;
  color: #000000;
  text-align: left;
`;

const CtaLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: ${SECTION_GAP}px;
  padding-bottom: 14px;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
`;

const CtaArrow = styled.img`
  width: 49px;
  height: 9px;
  flex-shrink: 0;
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #f2ebe7;
`;

const SeasonSection = styled.section`
  margin-top: ${SECTION_GAP}px;
`;

const SeasonTitle = styled.h2`
  margin: 0;
  padding: 0 ${CONTENT_X}px;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  color: #000000;
`;

const SeasonBanner = styled.div`
  width: 100%;
  height: 320px;
  margin-top: 16px;
  background: #f2f2f2;
  overflow: hidden;
`;

const SeasonImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CharmGrid = styled.div`
  display: grid;
  grid-template-columns: 164px 164px;
  justify-content: space-between;
  gap: 28px 0;
  margin-top: 28px;
  padding: 0 ${CONTENT_X}px;
`;

const CharmCard = styled(Link)`
  display: block;
  width: 164px;
`;

const CharmThumb = styled.div`
  width: 164px;
  height: 200px;
  background: #f2f2f2;
  overflow: hidden;
`;

const CharmImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CharmName = styled.p`
  margin: 12px 0 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  color: #000000;
`;

const CharmCollection = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: #c4b1a4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Status = styled.p`
  margin: 40px 20px;
  text-align: center;
  font-size: 14px;
  color: #8a7a6c;
`;

// 참 추천 페이지 — GET /api/recommend/charms
function CharmRecommend() {
  const { page, isLoading, error } = useCharmRecommendPage();

  if (isLoading) {
    return (
      <Page>
        <BackHeader />
        <Status>불러오는 중…</Status>
      </Page>
    );
  }

  if (error || !page) {
    return (
      <Page>
        <BackHeader />
        <Status>참 추천 정보를 불러오지 못했습니다.</Status>
      </Page>
    );
  }

  const { featured, season, charms } = page;

  return (
    <Page>
      <BackHeader />

      <Hero>
        {featured.imageUrl ? (
          <HeroImage src={featured.imageUrl} alt={featured.name} />
        ) : null}
      </Hero>

      <Intro>
        <Name>{featured.name}</Name>
        {featured.collectionName ? (
          <CollectionName>{featured.collectionName}</CollectionName>
        ) : null}
        {featured.description ? (
          <Description>{featured.description}</Description>
        ) : null}
        {featured.ctaLabel && featured.ctaTo ? (
          <CtaLink to={featured.ctaTo}>
            <span>{featured.ctaLabel}</span>
            <CtaArrow src={line2Icon} alt="" />
          </CtaLink>
        ) : null}
      </Intro>
      <SectionDivider />

      <SeasonSection>
        <SeasonTitle>{season.title}</SeasonTitle>
        <SeasonBanner>
          {season.imageUrl ? (
            <SeasonImage src={season.imageUrl} alt={season.title} />
          ) : null}
        </SeasonBanner>
        <CharmGrid>
          {charms.map((charm) => {
            const to = charm.productId
              ? `/product/${charm.productId}`
              : '#';
            return (
              <CharmCard
                key={charm.id}
                to={to}
                onClick={(event) => {
                  if (!charm.productId) event.preventDefault();
                }}
              >
                <CharmThumb>
                  {charm.imageUrl ? (
                    <CharmImage src={charm.imageUrl} alt={charm.name} />
                  ) : null}
                </CharmThumb>
                <CharmName>{charm.name}</CharmName>
                {charm.collectionName ? (
                  <CharmCollection>{charm.collectionName}</CharmCollection>
                ) : null}
              </CharmCard>
            );
          })}
        </CharmGrid>
      </SeasonSection>
    </Page>
  );
}

export default CharmRecommend;

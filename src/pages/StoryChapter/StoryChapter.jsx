import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
    storyChapterIntro,
    chapters,
    finalUnlockLabel,
    finalUnlockedLabel,
} from '../../mock/storyChapter';
import { getCompletedChapterIds } from '../../api/storyProgress';
import BackHeader from '../../components/common/Header/BackHeader';
import padlockIcon from '../../assets/icons/nav/padlock.svg';
import unlockIcon from '../../assets/icons/nav/unlock.svg';

const Page = styled.div`
    display: flex;
    flex-direction: column;
    `;

// 시즌 소개 영역
const IntroBox = styled.div`
    padding: 48px 30px 0;
`;

const Season = styled.p`
    margin: 0;
    color: black;
    font-size: 24px;
    font-family: 'SD Minburi';
    font-weight: 400;
    line-height: 22.75px;
`;

const Title = styled.h1`
    margin: 24px 0 0;
    color: black;
    font-size: 32px;
    font-family: 'SD Minburi';
    font-weight: 500;
    line-height: 22.75px;
`;

// 챕터 카드 목록
const ChapterList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 56px;
    padding: 0 30px;
`;

// 일반 챕터 카드 — 해금 여부에 따라 커서 변경
const ChapterCard = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 120px;
    padding: 0 16px 8px;
    background: #F6F4F2;
    cursor: ${({ $unlocked }) => ($unlocked ? 'pointer' : 'not-allowed')};
    opacity: ${({ $unlocked }) => ($unlocked ? 1 : 0.5)};
`;

const ChapterLabelRow = styled.div`
    display: flex;
    align-items: baseline;
    gap: 8px;
`;

const ChapterLabel = styled.span`
    color: black;
    font-size: 14px;
    font-family: 'SD Minburi';
    font-weight: 500;
    line-height: 22.75px;
`;

const ChapterName = styled.span`
    color: black;
    font-size: 14px;
    font-family: 'SD Minburi';
    font-weight: 400;
    line-height: 22.75px;
`;

const ReplayButton = styled.button`
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    color: black;
    font-size: 14px;
    font-family: 'SD Minburi';
    font-weight: 500;
    line-height: 22.75px;
`;

// 큰 카드 (Chapter 3 — 설명 포함)
const LargeCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 300px;
    padding: 31px 16px;
    background: #F6F4F2;
    cursor: ${({ $unlocked }) => ($unlocked ? 'pointer' : 'not-allowed')};
    opacity: ${({ $unlocked }) => ($unlocked ? 1 : 0.5)};
`;

const LargeLabelRow = styled.div`
    display: flex;
    align-items: baseline;
    gap: 4px;
`;

const LargeLabel = styled.span`
    color: black;
    font-size: 16px;
    font-family: 'SD Minburi';
    font-weight: 500;
    line-height: 22.75px;
`;

const LargeName = styled.span`
    color: black;
    font-size: 16px;
    font-family: 'SD Minburi';
    font-weight: 400;
    line-height: 22.75px;
`;

const Description = styled.p`
    margin: 7px 0 0;
    color: black;
    font-size: 14px;
    font-family: 'SD Minburi';
    font-weight: 400;
    line-height: 22.75px;
`;

// 최종 버튼 — 전체 완료 여부에 따라 활성/비활성
const FinalButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 74px;
    margin: 25px 30px 20px;
    border: none;
    color: #ffffff;
    font-size: 16px;
    font-family: 'SD Minburi';
    font-weight: 500;
    cursor: ${({ $enabled }) => ($enabled ? 'pointer' : 'not-allowed')};
    background: ${({ $enabled }) =>
    $enabled
        ? 'linear-gradient(180deg, #8b5e3c 0%, #5c3d26 100%)'
        : 'linear-gradient(180deg, #f6f4f2 0%, #000000 200%)'};
`;

const PadlockIcon = styled.img`
    width: 24px;
    height: 24px;
`;

// 스토리 챕터 페이지
function StoryChapter() {
const navigate = useNavigate();
// 완료된 챕터 id 목록 — localStorage 기반 진행 기록 (api/storyProgress)
const [completedChapterIds, setCompletedChapterIds] = useState([]);

useEffect(() => {
    getCompletedChapterIds().then(setCompletedChapterIds);
}, []);

const isCompleted = (chapter) => completedChapterIds.includes(chapter.id);

// 해금 규칙: 첫 챕터는 항상 열림, 그 외엔 이전 챕터가 완료되어야 열림
const isUnlocked = (index) => {
    if (index === 0) return true;
    return isCompleted(chapters[index - 1]);
};

// 모든 챕터 완료 여부
const allCompleted = chapters.every((chapter) => isCompleted(chapter));

// 챕터 카드 클릭 시 스토리 진행 페이지로 이동
const handleChapterClick = (chapter, index) => {
    if (!isUnlocked(index)) return;
    navigate(`/story/view/${chapter.id}`);
};

    // 최종 버튼 클릭 (전체 완료 시에만 동작)
const handleFinalClick = () => {
    if (!allCompleted) return;
    navigate('/story/reward'); // 보상 페이지 경로 (원하는 대로 수정)
};

    return (
    <Page>
        <BackHeader />

        <IntroBox>
            <Season>{storyChapterIntro.season}</Season>
            <Title>{storyChapterIntro.title}</Title>
        </IntroBox>

        <ChapterList>
        {chapters.map((chapter, index) => {
            const unlocked = isUnlocked(index);

            return chapter.large ? (
            <LargeCard
                key={chapter.id}
                $unlocked={unlocked}
                onClick={() => handleChapterClick(chapter, index)}
            >
                <LargeLabelRow>
                    <LargeLabel>{chapter.label}</LargeLabel>
                    <LargeName>{chapter.title}</LargeName>
                </LargeLabelRow>
                {chapter.description ? (
                <Description>{chapter.description}</Description>
                ) : null}
            </LargeCard>
            ) : (
            <ChapterCard
                key={chapter.id}
                $unlocked={unlocked}
                onClick={() => handleChapterClick(chapter, index)}
            >
                <ChapterLabelRow>
                    <ChapterLabel>{chapter.label}</ChapterLabel>
                    <ChapterName>{chapter.title}</ChapterName>
                </ChapterLabelRow>
                {/* 완료된 챕터만 다시보기 표시 */}
                {isCompleted(chapter) ? (
                <ReplayButton
                    type="button"
                    onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/story/view/${chapter.id}`);
                    }}
                >
                    다시보기
                </ReplayButton>
                ) : null}
            </ChapterCard>
            );
        })}
        </ChapterList>

        {/* 최종 버튼 — 전체 완료 전엔 잠금, 완료 시 활성화 */}
        <FinalButton
        type="button"
        $enabled={allCompleted}
        disabled={!allCompleted}
        onClick={handleFinalClick}
        >
        {!allCompleted ? (
            <>
            <PadlockIcon src={padlockIcon} alt="" aria-hidden /> {finalUnlockLabel}
            </>
        ) : (
            <>
            <PadlockIcon src={unlockIcon} alt="" aria-hidden /> {finalUnlockedLabel}
            </>
        )}
        </FinalButton>
    </Page>
    );
}

export default StoryChapter;
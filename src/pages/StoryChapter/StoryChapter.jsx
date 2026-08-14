import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { storyChapterIntro, chapters } from '../../mock/storyChapter';
import { getCompletedChapterIds } from '../../api/storyProgress';
import BackHeader from '../../components/common/Header/BackHeader';
import padlockIcon from '../../assets/icons/nav/padlock.svg';

// 페이지 전체 레이아웃
const Page = styled.div`
    display: flex;
    flex-direction: column;
    `;

// 시즌 소개 영역
const IntroBox = styled.div`
    padding: 3rem 1.875rem 0;
`;

// 시즌 텍스트 (예: Autumn Winter 2026)
const Season = styled.p`
    margin: 0;
    color: black;
    font-size: 1.5rem;
    font-family: 'SD Minburi';
    font-weight: 400;
    line-height: 1.421875rem;
`;

// 페이지 제목 (예: 스토리 챕터)
const Title = styled.h1`
    margin: 1.5rem 0 0;
    color: black;
    font-size: 2rem;
    font-family: 'SD Minburi';
    font-weight: 500;
    line-height: 1.421875rem;
`;

// 챕터 카드 목록
const ChapterList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 3.5rem;
    padding: 0 1.875rem 2.5rem;
`;

// 일반 챕터 카드 (해금된 챕터만 이 형태로 렌더링됨)
const ChapterCard = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 7.5rem;
    padding: 0 1rem 0.5rem;
    background: #F6F4F2;
    cursor: pointer;
`;

// 챕터 번호 + 제목을 나란히 배치하는 행
const ChapterLabelRow = styled.div`
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
`;

// "Chapter 1." 같은 챕터 번호 라벨
const ChapterLabel = styled.span`
    color: black;
    font-size: 0.875rem;
    font-family: 'SD Minburi';
    font-weight: 500;
    line-height: 1.421875rem;
`;

// 챕터 제목 (예: Introduction)
const ChapterName = styled.span`
    color: black;
    font-size: 0.875rem;
    font-family: 'SD Minburi';
    font-weight: 400;
    line-height: 1.421875rem;
`;

// 완료된 챕터에 노출되는 "다시보기" 버튼
const ReplayButton = styled.button`
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    color: black;
    font-size: 0.875rem;
    font-family: 'SD Minburi';
    font-weight: 500;
    line-height: 1.421875rem;
`;

// 큰 카드 (설명 포함, 해금된 챕터만 이 형태로 렌더링됨)
const LargeCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 18.75rem;
    padding: 1.9375rem 1rem;
    background: #F6F4F2;
    cursor: pointer;
`;

// 큰 카드의 챕터 번호 + 제목을 나란히 배치하는 행
const LargeLabelRow = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
`;

// 큰 카드의 챕터 번호 + 제목을 묶는 그룹
const LargeLabelGroup = styled.div`
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
`;

// 큰 카드의 챕터 번호 라벨
const LargeLabel = styled.span`
    color: black;
    font-size: 1rem;
    font-family: 'SD Minburi';
    font-weight: 500;
    line-height: 1.421875rem;
`;

// 큰 카드의 챕터 제목
const LargeName = styled.span`
    color: black;
    font-size: 1rem;
    font-family: 'SD Minburi';
    font-weight: 400;
    line-height: 1.421875rem;
`;

// 큰 카드에만 노출되는 챕터 설명 문구
const Description = styled.p`
    margin: 0.4375rem 0 0;
    color: black;
    font-size: 0.875rem;
    font-family: 'SD Minburi';
    font-weight: 400;
    line-height: 1.421875rem;
`;

// 잠긴 챕터 카드 — 크기와 상관없이 최종 버튼과 같은 4.625rem 막대로 표시
const LockedBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 4.625rem;
    background: linear-gradient(180deg, #f6f4f2 0%, #000000 200%);
    cursor: not-allowed;
`;

// 잠긴 챕터 막대 안내 문구 (예: "Chapter 1 완료 시 해금")
const LockedText = styled.span`
    color: #ffffff;
    font-size: 1rem;
    font-family: 'SD Minburi';
    font-weight: 500;
`;

// 잠긴 챕터 막대에 표시되는 자물쇠 아이콘
const PadlockIcon = styled.img`
    width: 1.5rem;
    height: 1.5rem;
`;

// 스토리 챕터 페이지
function StoryChapter() {
const navigate = useNavigate();
// 완료된 챕터 id 목록 — localStorage 기반 진행 기록 (api/storyProgress)
const [completedChapterIds, setCompletedChapterIds] = useState([]);

useEffect(() => {
    getCompletedChapterIds().then(setCompletedChapterIds);
}, []);

// 해당 챕터를 끝까지 봤는지 여부
const isCompleted = (chapter) => completedChapterIds.includes(chapter.id);

// 해금 규칙: 첫 챕터는 항상 열림, 그 외엔 이전 챕터가 완료되어야 열림
const isUnlocked = (index) => {
    if (index === 0) return true;
    return isCompleted(chapters[index - 1]);
};

// 챕터 카드 클릭 시 스토리 진행 페이지로 이동
const handleChapterClick = (chapter, index) => {
    if (!isUnlocked(index)) return;
    navigate(`/story/view/${chapter.id}`);
};

    return (
    <Page>
        <BackHeader />

        {/* 시즌/타이틀 소개 영역 */}
        <IntroBox>
            <Season>{storyChapterIntro.season}</Season>
            <Title>{storyChapterIntro.title}</Title>
        </IntroBox>

        <ChapterList>
        {chapters.map((chapter, index) => {
            const unlocked = isUnlocked(index);

            // 잠긴 챕터 — 이전 챕터 완료 시 해금된다는 안내 막대만 표시
            if (!unlocked) {
            // 라벨 끝의 마침표(.)를 떼어 "Chapter N 완료 시 해금" 문구를 만듦
            const prevLabel = chapters[index - 1].label.replace(/\.$/, '');
            return (
                <LockedBar key={chapter.id}>
                <PadlockIcon src={padlockIcon} alt="" aria-hidden />
                <LockedText>{prevLabel} 완료 시 해금</LockedText>
                </LockedBar>
            );
            }

            // 해금된 챕터 — chapter.large 여부에 따라 큰 카드/일반 카드로 렌더링
            return chapter.large ? (
            <LargeCard key={chapter.id} onClick={() => handleChapterClick(chapter, index)}>
                <LargeLabelRow>
                    <LargeLabelGroup>
                        <LargeLabel>{chapter.label}</LargeLabel>
                        <LargeName>{chapter.title}</LargeName>
                    </LargeLabelGroup>
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
                </LargeLabelRow>
                {chapter.description ? (
                <Description>{chapter.description}</Description>
                ) : null}
            </LargeCard>
            ) : (
            <ChapterCard key={chapter.id} onClick={() => handleChapterClick(chapter, index)}>
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
    </Page>
    );
}

export default StoryChapter;
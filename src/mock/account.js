// 마이페이지 메뉴 데이터 (추후 백엔드 연동)
export const accountSections = [
{
    id: 'my-info',
    title: '내 정보',
    items: [
    { id: 'wishlist', label: '위시리스트' },
    { id: 'store-tag-history', label: '매장 태그 이력' },
    { id: 'available-charm', label: '구매 가능한 참' },
    ],
},

    {
    id: 'settings',
    title: '설정',
    items: [
        { id: 'terms', label: '온라인 서비스 이용약관' },
        { id: 'privacy', label: '개인정보 처리방침' },
        { id: 'cookie', label: 'COOKIE POLICY', url: 'https://쿠키정책URL' },
    ],
    },

{
    id: 'account-manage',
    title: '계정 관리',
    items: [
    { id: 'logout', label: '로그아웃' },
    { id: 'withdraw', label: '계정 탈퇴' },
    ],
},
];
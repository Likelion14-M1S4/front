// 앱 전체 고정 너비 (홈·헤더·네비 공통)
export const APP_WIDTH = 390;

// 상단 헤더 높이 (MCM 로고 헤더 · 뒤로가기 헤더 공통)
export const HEADER_HEIGHT = 80;

// 앱 기본 폰트
export const FONT_FAMILY =
  "'SD Minburi', 'SD 민부리', 'SD Minburi Space3', 'Apple SD Gothic Neo', sans-serif";

// 섹션 설명 ↔ 다음 섹션 사진 간격
export const SECTION_GAP = 56;

// ── 반응형(rem) 단위 — 1rem = 16px 기준 ──────────────────────────
// html font-size가 clamp(14px, 4.1vw, 17px)로 뷰포트에 맞춰 유동적으로
// 스케일링되므로(GlobalStyle 참고), 아래 rem 값들은 화면 폭에 비례해 커지거나 작아집니다.
// px→rem 전환이 끝나는 파일부터 위 APP_WIDTH/HEADER_HEIGHT/SECTION_GAP 대신 이 값을 사용합니다.
export const APP_WIDTH_REM = 24.375; // 390px ÷ 16
export const APP_MAX_WIDTH_REM = 26.875; // 430px ÷ 16 — AppFrame 상한 (min(100vw, 26.875rem))
export const HEADER_HEIGHT_REM = 5; // 80px ÷ 16
export const SECTION_GAP_REM = 3.5; // 56px ÷ 16

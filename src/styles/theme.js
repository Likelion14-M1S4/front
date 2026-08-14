// 앱 기본 폰트
export const FONT_FAMILY =
  "'SD Minburi', 'SD 민부리', 'SD Minburi Space1', 'Apple SD Gothic Neo', sans-serif";

// ── 반응형(rem) 단위 — 1rem = 16px 기준 ──────────────────────────
// html font-size가 clamp(14px, 4.1vw, 17px)로 뷰포트에 맞춰 유동적으로
// 스케일링되므로(GlobalStyle 참고), 아래 rem 값들은 화면 폭에 비례해 커지거나 작아집니다.
export const APP_MAX_WIDTH_REM = 26.875; // 430px ÷ 16 — AppFrame 상한 (min(100vw, 26.875rem))
export const HEADER_HEIGHT_REM = 5; // 80px ÷ 16
export const SECTION_GAP_REM = 3.5; // 56px ÷ 16

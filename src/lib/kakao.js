const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY;

// Kakao.Auth.authorize()에 쓰는 값과 백엔드에 보내는 값이 반드시 똑같아야 해서 한 곳에서 관리합니다.
// 카카오 콘솔의 Redirect URI 등록값과도 정확히 일치해야 합니다.
export const KAKAO_REDIRECT_URI = 'http://localhost:5173/oauth/kakao';

// index.html에서 로드한 Kakao SDK를 앱 시작 시 한 번만 초기화합니다.
// 키가 없으면 Kakao.init()이 예외를 던져 앱 부팅 자체가 막히므로, 이 경우는 카카오
// 로그인만 비활성화하고(버튼 클릭 시 안내) 앱은 정상적으로 뜨도록 건너뜁니다.
export function initKakao() {
  if (!window.Kakao) return;
  if (!KAKAO_JS_KEY) {
    console.warn('[kakao] VITE_KAKAO_JS_KEY가 설정되지 않아 초기화를 건너뜁니다.');
    return;
  }
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_JS_KEY);
  }
}

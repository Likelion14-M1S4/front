import api from './axios';

/**
 * POST /api/auth/kakao
 * @param {string} code Kakao.Auth.authorize() 리다이렉트로 받은 인가 코드
 * @param {string} redirectUri authorize() 호출 때 쓴 것과 동일한 redirectUri
 * @returns {Promise<{ accessToken: string, refreshToken: string, isNewUser: boolean }>}
 */
export async function kakaoLogin(code, redirectUri) {
  const { data } = await api.post('/api/auth/kakao', { code, redirectUri });
  const { accessToken, refreshToken, isNewUser } = data.data;

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  return { accessToken, refreshToken, isNewUser };
}

/**
 * POST /api/auth/logout (인증 필요)
 */
export async function logout() {
  try {
    await api.post('/api/auth/logout');
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

/**
 * GET /api/users/me (인증 필요)
 */
export async function getMe() {
  const { data } = await api.get('/api/users/me');
  return data.data;
}

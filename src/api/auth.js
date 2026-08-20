import api from './axios';

/**
 * GET /api/users/me (인증 필요)
 * @returns {Promise<{ email: string, nickname: string, phone: string, birthDate: string }>}
 */
export async function getMe() {
  const { data } = await api.get('/api/users/me');
  return data.data;
}

/**
 * POST /api/auth/logout (인증 필요)
 * 로그인한 유저의 리프레시 토큰을 무효화한다. access 토큰은 stateless라 만료까지 유효하므로
 * 호출부(AuthContext)에서 로컬 저장 토큰(access/refresh)도 함께 삭제해야 한다.
 */
export async function postLogout() {
  const { data } = await api.post('/api/auth/logout');
  return data;
}

/**
 * DELETE /api/auth/withdraw (인증 필요)
 * 로그인한 유저를 하드 삭제한다. 복구 불가.
 */
export async function deleteWithdraw() {
  const { data } = await api.delete('/api/auth/withdraw');
  return data;
}

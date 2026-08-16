import api from './axios';

/**
 * GET /api/users/me (인증 필요)
 * @returns {Promise<{ email: string, nickname: string, phone: string, birthDate: string }>}
 */
export async function getMe() {
  const { data } = await api.get('/api/users/me');
  return data.data;
}

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

// 모든 API 요청은 이 인스턴스를 통해서만 호출합니다.
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// refresh 요청 전용 인스턴스. api의 응답 인터셉터(401 처리)를 타지 않아
// refresh 자체가 401을 반환해도 재귀적으로 refresh를 또 호출하지 않습니다.
const refreshClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

function redirectToLogin() {
  clearTokens();
  window.location.href = '/login';
}

async function refreshTokens() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token');
  }

  const { data } = await refreshClient.post('/api/auth/refresh', { refreshToken });
  const { accessToken, refreshToken: nextRefreshToken } = data.data;

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', nextRefreshToken);

  return accessToken;
}

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 동시에 여러 요청이 401을 받아도 refresh는 한 번만 실행되도록,
// 진행 중인 refresh가 있으면 나머지 요청은 이 큐에서 결과를 기다립니다.
let isRefreshing = false;
let refreshQueue = [];

function resolveQueue(accessToken) {
  refreshQueue.forEach(({ resolve }) => resolve(accessToken));
  refreshQueue = [];
}

function rejectQueue(error) {
  refreshQueue.forEach(({ reject }) => reject(error));
  refreshQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (!response || response.status !== 401 || !config || config._retry) {
      return Promise.reject(error);
    }

    // refresh 요청 자체가 401이면 더 이상 재시도하지 않고 바로 로그아웃 처리
    if (config.url?.includes('/auth/refresh')) {
      redirectToLogin();
      return Promise.reject(error);
    }

    // 인증이 필요 없는 로그인 요청의 401(잘못된 자격 증명)은 토큰 만료가 아니므로
    // refresh를 시도하지 않고 에러를 그대로 호출부(로그인 화면)로 전달합니다.
    if (config.url?.includes('/auth/kakao')) {
      return Promise.reject(error);
    }

    config._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: (accessToken) => {
            config.headers.Authorization = `Bearer ${accessToken}`;
            resolve(api(config));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const accessToken = await refreshTokens();
      resolveQueue(accessToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
      return api(config);
    } catch (refreshError) {
      rejectQueue(refreshError);
      redirectToLogin();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;

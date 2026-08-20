import { createContext, useContext, useState } from 'react';
import { postLogout, deleteWithdraw } from '../api/auth';

const AuthContext = createContext(null);

function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

// 로그인 상태를 앱 전체에서 공유 (지금은 메모리, 추후 API 연동으로 교체)
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);

  // 서버 refresh 토큰을 무효화한다. 서버 호출이 실패해도 로컬 세션(토큰·상태)은 항상 정리한다.
  const logout = async () => {
    try {
      await postLogout();
    } finally {
      clearTokens();
      setIsLoggedIn(false);
    }
  };

  // 계정 하드 삭제 — 복구 불가. 서버 삭제가 성공했을 때만 로컬 세션을 정리한다.
  const withdraw = async () => {
    await deleteWithdraw();
    clearTokens();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, withdraw }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
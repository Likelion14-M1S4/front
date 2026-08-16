import { useEffect, useState } from 'react';
import { getMe } from '../api/auth';

// 내 정보(GET /api/users/me)를 불러오는 훅
export function useMyInfo() {
  const [myInfo, setMyInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getMe()
      .then((data) => {
        if (isMounted) setMyInfo(data);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { myInfo, isLoading, error };
}

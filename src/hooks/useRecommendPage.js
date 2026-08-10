import { useEffect, useState } from 'react';
import { getRecommendPage } from '../api/recommend';

// 추천 페이지 전체 데이터 — GET /api/recommend
export function useRecommendPage() {
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getRecommendPage()
      .then((data) => {
        if (isMounted) setPage(data);
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

  return { page, isLoading, error };
}

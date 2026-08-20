import { useEffect, useState } from 'react';
import { getCharmRecommendPage } from '../api/charmRecommend';

// 참 추천 페이지 — GET /api/recommend/charms
export function useCharmRecommendPage() {
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getCharmRecommendPage()
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

import { useEffect, useState } from 'react';
import { getSeasonProducts } from '../api/seasonProducts';

// 시즌 제품 목록 — GET /api/season/products
export function useSeasonProducts() {
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getSeasonProducts()
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

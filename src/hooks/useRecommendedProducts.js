import { useEffect, useState } from 'react';
import { getRecommendedProducts } from '../api/products';

// 홈 추천 제품 목록 (개수 가변) — GET /api/products/recommended
export function useRecommendedProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getRecommendedProducts()
      .then((data) => {
        if (isMounted) setProducts(Array.isArray(data) ? data : []);
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

  return { products, isLoading, error };
}

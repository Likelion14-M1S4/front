import { useEffect, useState } from 'react';
import { getProductById } from '../api/products';
import { getCompletedChapterIds } from '../api/storyProgress';

// 시즌 제품 상세 + 스토리 진행 여부 — GET /api/season/products/:id, GET /api/story/progress
export function useSeasonProductDetail(productId) {
  const [product, setProduct] = useState(null);
  const [storyProgressed, setStoryProgressed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      setStoryProgressed(false);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    Promise.all([getProductById(productId), getCompletedChapterIds()])
      .then(([productData, completedIds]) => {
        if (!isMounted) return;
        setProduct(productData);
        setStoryProgressed(Array.isArray(completedIds) && completedIds.length > 0);
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
  }, [productId]);

  return { product, storyProgressed, isLoading, error };
}

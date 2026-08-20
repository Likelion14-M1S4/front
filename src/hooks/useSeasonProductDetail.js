import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeasonProductById } from '../api/seasonProducts';
import { getStoryChapters } from '../api/storyProgress';

function hasCompletedSeasonStory(page) {
  if (page?.isSeasonCompleted === true) return true;

  const stories = Array.isArray(page?.stories) ? page.stories : [];
  return stories.length > 0 && stories.every((story) => story.isDone);
}

// 시즌 한정 참 상세 + 스토리 진행 여부 — GET /api/charms/:id, GET /api/stories
export function useSeasonProductDetail(productId) {
  const location = useLocation();
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

    Promise.all([getSeasonProductById(productId), getStoryChapters()])
      .then(([productData, storyPage]) => {
        if (!isMounted) return;
        setProduct(productData);
        setStoryProgressed(hasCompletedSeasonStory(storyPage));
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
  }, [productId, location.key]);

  return { product, storyProgressed, isLoading, error };
}

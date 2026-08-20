import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import { getSeasonProductById } from '../api/seasonProducts';
import { getStoryChapters } from '../api/storyProgress';

// GET /api/stories/{storyId} 의 isSeasonCompleted 만 사용 (isPurchase 미사용)
async function fetchIsSeasonCompleted() {
  const page = await getStoryChapters();
  const stories = Array.isArray(page?.stories) ? page.stories : [];
  const unlocked = stories.filter((story) => !story.isLocked);
  const target = unlocked[unlocked.length - 1] ?? stories[0];
  if (!target?.id) return false;

  const { data } = await api.get(`/api/stories/${target.id}`);
  return data.data?.isSeasonCompleted === true;
}

// 시즌 한정 참 상세 — GET /api/charms/:id, GET /api/stories/{storyId}
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

    Promise.all([
      getSeasonProductById(productId),
      fetchIsSeasonCompleted().catch(() => false),
    ])
      .then(([productData, completed]) => {
        if (!isMounted) return;
        setProduct(productData);
        setStoryProgressed(completed === true);
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

import { useEffect, useState } from 'react';
import { getCollectedCharacters } from '../api/characters';

// 사용자가 수집한 캐릭터 목록을 불러오는 훅
export function useCollectedCharacters() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getCollectedCharacters()
      .then((data) => {
        if (isMounted) setCharacters(data ?? []);
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

  return { characters, isLoading, error };
}

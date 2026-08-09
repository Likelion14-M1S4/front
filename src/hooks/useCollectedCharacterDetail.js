import { useEffect, useState } from 'react';
import { getCollectedCharacterById } from '../api/characters';

// 사용자가 수집한 캐릭터 상세를 불러오는 훅
export function useCollectedCharacterDetail(characterId) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!characterId) {
      setCharacter(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getCollectedCharacterById(characterId)
      .then((data) => {
        if (isMounted) setCharacter(data);
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
  }, [characterId]);

  return { character, isLoading, error };
}

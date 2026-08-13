import { useEffect, useState } from 'react';
import { readStoreTagNfc } from '../api/storeTagNfc';

// 매장 태그 NFC 읽기 — POST /api/store-tag/nfc
// resolved 전까지 로딩 화면을 유지합니다.
// requestKey가 바뀌면(다시 시도) 재요청합니다.
export function useStoreTagNfc({ requestKey = 0 } = {}) {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);
    setResult(null);

    readStoreTagNfc()
      .then((data) => {
        if (isMounted) setResult(data);
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
  }, [requestKey]);

  return { result, isLoading, error };
}

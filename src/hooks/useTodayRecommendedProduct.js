import { useEffect, useState } from 'react';
import { getTodayRecommendedProduct } from '../api/products';

// 오늘의 추천 제품 데이터를 불러오는 커스텀 훅
// 컴포넌트는 이 훅을 통해서만 데이터를 사용하고, 요청 로직은 신경 쓰지 않습니다.
export function useTodayRecommendedProduct() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getTodayRecommendedProduct()
      .then((data) => {
        if (isMounted) setProduct(data);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { product, isLoading };
}

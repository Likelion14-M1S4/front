import api from './axios';
import { todayRecommendedProduct } from '../mock/products';

// 백엔드 연동 전까지는 mock 데이터를 사용합니다.
// 연동 시 아래 주석 처리된 axios 호출로 교체하면 됩니다.
export async function getTodayRecommendedProduct() {
  // const { data } = await api.get('/products/recommended/today');
  // return data;

  return Promise.resolve(todayRecommendedProduct);
}

// 원화 가격 표시 (예: ₩1,490,000)
export function formatPrice(price) {
  if (price == null || Number.isNaN(Number(price))) return '';
  return `₩${Number(price).toLocaleString('ko-KR')}`;
}

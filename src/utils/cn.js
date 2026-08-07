// 조건부 className을 공백으로 이어붙이는 유틸 함수
// 예: cn('base', isActive && 'active', hasError && 'error')
export function cn(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

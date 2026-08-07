import { cn } from '../../../utils/cn';

const variantClassNames = {
  primary: 'bg-mcm-black text-mcm-white',
  outline: 'border border-mcm-black text-mcm-black bg-transparent',
};

// 서비스 전반에서 사용하는 공통 버튼
function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  onClick,
  className,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center rounded-none px-5 py-3 text-sm font-medium tracking-wide transition-opacity active:opacity-70',
        variantClassNames[variant],
        fullWidth && 'w-full',
        className,
      )}
    >
      {children}
    </button>
  );
}

export default Button;

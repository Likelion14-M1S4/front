import styled, { css } from 'styled-components';

const sizeStyles = {
  sm: css`
    padding: 8px 16px;
    font-size: 14px;
  `,
  md: css`
    padding: 10px 20px;
    font-size: 16px;
  `,
  lg: css`
    padding: 12px 28px;
    font-size: 18px;
  `,
};

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.accent};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.accentHover};
      border-color: ${({ theme }) => theme.colors.accentHover};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.accentBg};
    color: ${({ theme }) => theme.colors.accent};
    border: 1px solid ${({ theme }) => theme.colors.accentBorder};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.accentBorder};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textHeading};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.accent};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.accentBg};
      color: ${({ theme }) => theme.colors.accent};
    }
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  font-weight: 500;
  line-height: 1;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s, opacity 0.2s;
  white-space: nowrap;

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  disabled = false,
  onClick,
  ...rest
}) {
  return (
    <StyledButton
      type={type}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

export default Button;

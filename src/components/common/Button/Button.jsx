import styled, { css } from 'styled-components';

const variantStyles = {
  primary: css`
    background: #1a1a1a;
    color: #ffffff;
  `,
  outline: css`
    border: 1px solid #1a1a1a;
    color: #1a1a1a;
    background: transparent;
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  transition: opacity 0.15s;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $variant }) => variantStyles[$variant] || variantStyles.primary}

  &:active {
    opacity: 0.7;
  }
`;

// 서비스 전반에서 사용하는 공통 버튼
function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  onClick,
}) {
  return (
    <StyledButton type={type} onClick={onClick} $variant={variant} $fullWidth={fullWidth}>
      {children}
    </StyledButton>
  );
}

export default Button;

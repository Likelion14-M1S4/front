import styled from 'styled-components';

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textHeading};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.border};
  border-radius: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textHeading};
  background-color: ${({ theme }) => theme.colors.background};
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.accent};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError ? 'rgba(239, 68, 68, 0.15)' : theme.colors.accentBg};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.codeBg};
  }
`;

const HelperText = styled.span`
  font-size: 13px;
  color: ${({ theme, $hasError }) =>
    $hasError ? theme.colors.error : theme.colors.text};
`;

function Input({
  id,
  label,
  error,
  helperText,
  ...rest
}) {
  const inputId = id ?? rest.name;
  const message = error ?? helperText;

  return (
    <Field>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <StyledInput id={inputId} $hasError={Boolean(error)} {...rest} />
      {message && (
        <HelperText $hasError={Boolean(error)} role={error ? 'alert' : undefined}>
          {message}
        </HelperText>
      )}
    </Field>
  );
}

export default Input;

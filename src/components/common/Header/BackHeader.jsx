import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import vector4Icon from '../../../assets/icons/Vector4.svg';
import { HEADER_HEIGHT } from '../../../styles/theme';

const TopBar = styled.div`
  display: flex;
  align-items: center;
  height: ${HEADER_HEIGHT}px;
  padding: 0 12px;
  background: #ffffff;
  box-sizing: border-box;
  flex-shrink: 0;
`;

const TopDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #f2ebe7;
  flex-shrink: 0;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const BackIcon = styled.img`
  width: 13px;
  height: 23px;
`;

/** 홈 MCM 로고 헤더와 같은 높이(80px)의 뒤로가기 헤더 */
function BackHeader({ showDivider = true, onBack, ariaLabel = '뒤로 가기' }) {
  const navigate = useNavigate();

  return (
    <>
      <TopBar>
        <BackButton
          type="button"
          aria-label={ariaLabel}
          onClick={onBack ?? (() => navigate(-1))}
        >
          <BackIcon src={vector4Icon} alt="" aria-hidden />
        </BackButton>
      </TopBar>
      {showDivider ? <TopDivider /> : null}
    </>
  );
}

export default BackHeader;

import { Link } from 'react-router-dom';
import hamburgerIcon from '../../../assets/icons/nav/header/hamburger.svg';
import mcmLogo from '../../../assets/icons/nav/header/mcm.svg';
import cartIcon from '../../../assets/icons/nav/header/cart.svg';

// 모든 페이지 상단에 고정되는 헤더
// 좌측 메뉴 버튼, 중앙 로고, 우측 장바구니 버튼으로 구성됩니다.
function Header({ onMenuClick }) {
  return (
    <header className="absolute inset-x-0 top-0 z-50 flex h-[64px] w-app items-center border-b border-mcm-border bg-mcm-ivory/95 backdrop-blur-sm">
      <div className="flex h-full w-full items-center justify-between px-5">
        <button
          type="button"
          aria-label="메뉴 열기"
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center"
        >
          <img src={hamburgerIcon} alt="" aria-hidden className="h-3 w-[18px]" />
        </button>

        <Link to="/" className="flex items-center" aria-label="홈으로 이동">
          <img src={mcmLogo} alt="MCM" className="h-4 w-[62px]" />
        </Link>

        <Link
          to="/cart"
          aria-label="장바구니"
          className="flex h-9 w-9 items-center justify-center"
        >
          <img src={cartIcon} alt="" aria-hidden className="h-[26px] w-4" />
        </Link>
      </div>
    </header>
  );
}

export default Header;

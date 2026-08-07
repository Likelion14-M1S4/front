import { NavLink } from 'react-router-dom';
import { cn } from '../../../utils/cn';
import { navigationItems } from './navigationItems';

// 하단 고정 네비게이션 바 — 위 두 꼭짓점만 둥글게, 아래는 직각
function Navigation() {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-50 w-app">
      <div className="flex h-[80px] w-full items-center justify-center rounded-t-[9999px] bg-white px-1">
        <ul className="flex h-full items-stretch gap-5">
          {navigationItems.map(({ label, path, icon, inactiveIcon }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex h-full w-12 flex-col items-center justify-center text-[11px] transition-colors',
                    isActive ? 'text-[#795921]' : 'text-[#4D4540]',
                  )
                }
              >
                {({ isActive }) => (
                  <span className="flex h-[39px] flex-col items-center justify-between">
                    <img
                      src={isActive ? icon : inactiveIcon}
                      alt=""
                      aria-hidden
                      className="h-[18px] w-[18px]"
                    />
                    <span className="leading-none">{label}</span>
                    <span
                      className={cn(
                        'h-1 w-1 rounded-full',
                        isActive ? 'bg-[#795921]' : 'bg-transparent',
                      )}
                    />
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;

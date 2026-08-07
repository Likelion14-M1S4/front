import { Link } from 'react-router-dom';
import { HiOutlineArrowRight } from 'react-icons/hi';

// 이미지 위에 제목/설명이 얹히는 카드 (홈 화면의 시즌 배너에서 사용)
function ImageCard({ imageUrl, title, description, linkTo, showArrow = false }) {
  return (
    <Link
      to={linkTo}
      className="block h-[358px] w-[358px] overflow-hidden rounded-none border border-mcm-border bg-mcm-gray/10"
    >
      <div className="relative h-full w-full">
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 pb-5 pt-20">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="text-[20px] font-bold text-mcm-white">{title}</h3>
              <p className="mt-1.5 text-[10px] leading-relaxed text-mcm-white/90">
                {description}
              </p>
            </div>
            {showArrow && (
              <HiOutlineArrowRight size={22} className="mb-1 shrink-0 text-mcm-white" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ImageCard;

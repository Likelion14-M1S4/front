import { Link } from 'react-router-dom';

// 상품 이미지 + 이름 + 설명을 보여주는 카드
function ProductCard({ productId, imageUrl, name, description }) {
  return (
    <Link to={`/product/${productId}`} className="block">
      <div className="flex justify-center">
        <div className="h-[153.43px] w-[358px] overflow-hidden rounded-[4px] border border-mcm-border bg-mcm-gray/10">
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="px-5">
        <h3 className="mt-4 text-[16px] font-bold text-mcm-title">{name}</h3>
        <p className="mt-1.5 text-[14px] leading-relaxed text-mcm-body">{description}</p>
      </div>
    </Link>
  );
}

export default ProductCard;

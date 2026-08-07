import ProductCard from '../../components/common/Card/ProductCard';
import { useTodayRecommendedProduct } from '../../hooks/useTodayRecommendedProduct';

// 홈 화면 오늘의 추천 제품 섹션
function RecommendedProductSection() {
  const { product, isLoading } = useTodayRecommendedProduct();

  if (isLoading || !product) return null;

  return (
    <section className="pt-12 pb-6">
      <h2 className="px-5 text-[18px] font-bold text-mcm-title">오늘의 추천 제품</h2>

      <div className="mt-4">
        <ProductCard
          productId={product.id}
          imageUrl={product.imageUrl}
          name={product.name}
          description={product.description}
        />
      </div>
    </section>
  );
}

export default RecommendedProductSection;

import { Link } from 'react-router-dom';
import { featuredStory } from '../../mock/story';

// 홈 화면 스토리 섹션 (텍스트 + 이미지)
function StorySection() {
  return (
    <section className="pt-12">
      <div className="px-5">
        <h2 className="text-[18px] font-bold text-mcm-title">{featuredStory.title}</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-mcm-body">
          {featuredStory.description}
        </p>
      </div>

      <div className="mt-4 flex justify-center">
        <Link
          to={featuredStory.linkTo}
          className="block h-[153.43px] w-[358px] overflow-hidden rounded-[4px] border border-mcm-border"
        >
          <img
            src={featuredStory.imageUrl}
            alt={featuredStory.title}
            className="h-full w-full object-cover"
          />
        </Link>
      </div>
    </section>
  );
}

export default StorySection;

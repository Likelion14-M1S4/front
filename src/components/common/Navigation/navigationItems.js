import homeIcon from '../../../assets/icons/nav/active/home.svg';
import homeIconInactive from '../../../assets/icons/nav/inactive/home.svg';
import collectionIcon from '../../../assets/icons/nav/active/collection.svg';
import collectionIconInactive from '../../../assets/icons/nav/inactive/collection.svg';
import storyIcon from '../../../assets/icons/nav/active/story.svg';
import storyIconInactive from '../../../assets/icons/nav/inactive/story.svg';
import recommendIcon from '../../../assets/icons/nav/active/recommend.svg';
import recommendIconInactive from '../../../assets/icons/nav/inactive/recommend.svg';
import accountIcon from '../../../assets/icons/nav/active/account.svg';
import accountIconInactive from '../../../assets/icons/nav/inactive/account.svg';

// 하단 네비게이션 메뉴
// active/: 선택 #795921 / inactive/: 비선택 #4D4540
export const navigationItems = [
  { label: '홈', path: '/', icon: homeIcon, inactiveIcon: homeIconInactive },
  { label: '컬렉션', path: '/collection', icon: collectionIcon, inactiveIcon: collectionIconInactive },
  { label: '스토리', path: '/story', icon: storyIcon, inactiveIcon: storyIconInactive },
  { label: '추천', path: '/recommend', icon: recommendIcon, inactiveIcon: recommendIconInactive },
  { label: '내계정', path: '/account', icon: accountIcon, inactiveIcon: accountIconInactive },
];

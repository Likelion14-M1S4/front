import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Collection from '../pages/Collection/Collection';
import CollectionDetail from '../pages/Collection/CollectionDetail';
import CharacterChat from '../pages/Chat/CharacterChat';
import Story from '../pages/Story/Story';
import StoryChapter from '../pages/StoryChapter/StoryChapter';
import StoryView from '../pages/StoryChapter/StoryView';
import Recommend from '../pages/Recommend/Recommend';
import CharmRecommend from '../pages/CharmRecommend/CharmRecommend';
import Product from '../pages/Product/Product';
import Account from '../pages/Account/Account';
import Login from '../pages/Account/Login';

// 페이지 경로와 컴포넌트 매핑
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/collection/:characterId" element={<CollectionDetail />} />
      <Route path="/collection/:characterId/chat" element={<CharacterChat />} />
      <Route path="/story" element={<Story />} />
      <Route path="/story/chapter" element={<StoryChapter />} />
      <Route path="/story/view/:id" element={<StoryView />} />
      <Route path="/recommend" element={<Recommend />} />
      <Route path="/recommend/charms" element={<CharmRecommend />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/account" element={<Account />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;

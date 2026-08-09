import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Collection from '../pages/Collection/Collection';
import CollectionDetail from '../pages/Collection/CollectionDetail';
import CharacterChat from '../pages/Chat/CharacterChat';
import Story from '../pages/Story/Story';
import Concierge from '../pages/Concierge/Concierge';
import Product from '../pages/Product/Product';
import Account from '../pages/Account/Account';

// 페이지 경로와 컴포넌트 매핑
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/collection/:characterId" element={<CollectionDetail />} />
      <Route path="/collection/:characterId/chat" element={<CharacterChat />} />
      <Route path="/story" element={<Story />} />
      <Route path="/concierge" element={<Concierge />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default AppRoutes;

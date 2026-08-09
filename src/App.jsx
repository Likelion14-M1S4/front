import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/Layout/Layout';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext'; //api 연동 전 로그인 확인을 위함

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AuthProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
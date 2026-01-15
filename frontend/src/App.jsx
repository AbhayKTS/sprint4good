import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import FormPage from './pages/FormPage';
import ResultsPage from './pages/ResultsPage';
import DashboardPage from './pages/DashboardPage';
import NotFound from './pages/NotFound';
import { useSessionStore } from './store/useSessionStore';
import LoadingOverlay from './components/LoadingOverlay';

const App = () => {
  const { loading } = useSessionStore();
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {loading && <LoadingOverlay />}
    </Layout>
  );
};

export default App;

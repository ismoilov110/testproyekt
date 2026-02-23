import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AuthGuard } from '@/components/AuthGuard';

const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
const Statements = lazy(() => import('@/pages/Statements'));
const Placeholder = lazy(() => import('@/pages/Placeholder'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center font-bold text-primary animate-pulse">Yuklanmoqda...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<AuthGuard />}>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Home />} />
              <Route path="analytics" element={<Placeholder title="Axborot-tahlil, ijro intizomi" />} />
              <Route path="hr" element={<Placeholder title="Inson resurslarini boshqarish" />} />
              <Route path="finance" element={<Placeholder title="Moliya-iqtisod va buxgalteriya" />} />
              <Route path="forest-creation" element={<Placeholder title="O‘rmon barpo qilish" />} />
              <Route path="forest-cadastre" element={<Placeholder title="O‘rmon kadastri, ijara" />} />
              <Route path="forest-additional" element={<Placeholder title="O‘rmonlardan qo‘shimcha..." />} />
              <Route path="forest-protection" element={<Placeholder title="O‘rmonlarni muhofaza qilish" />} />
              <Route path="green-development" element={<Placeholder title="Yashil hududlarni rivojlantirish" />} />
              <Route path="certificates" element={<Statements />} />
              <Route path="help" element={<Placeholder title="Yordam va ma’lumot" />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

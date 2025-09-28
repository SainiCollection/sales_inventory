import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { CircularProgress, Box } from '@mui/material';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import CartPage from '../modules/cart/pages/CartPage';
import ProductDetailPage from '../modules/inventory/pages/ProductDetails';
import AdminProfilePage from '../modules/admin/pages/AdminProfilePage';
import ManagementPage from '../modules/admin/pages/ManagementPage.tsx';

const InventoryPage = lazy(() => import('../modules/inventory/pages/InventoryPage'));
const SalesPage = lazy(() => import('../modules/sales/pages/SalesPage'));
const AccountsPage = lazy(() => import('../modules/accounts/pages/AccountsPage'));
const LoginPage = lazy(() => import('../modules/auth/pages/LoginPage'));
const SignupPage = lazy(() => import('../modules/auth/pages/SignupPage'));
const ForgotPasswordPage = lazy(() => import('../modules/auth/pages/ForgotPasswordPage'));
const DashboardPage = lazy(() => import('../modules/dashboard/pages/DashboardPage'));

const Loader = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
    <CircularProgress />
  </Box>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useAppSelector((s) => s.auth.user);
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppRouter = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {/* Auth routes share a simple centered layout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected app routes use MainLayout and require auth */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/productDetails" element={<ProductDetailPage />} />
        <Route path="/adminProfile" element={<AdminProfilePage />} />
        <Route path="/Management" element={<ManagementPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </Suspense>
);

export default AppRouter;

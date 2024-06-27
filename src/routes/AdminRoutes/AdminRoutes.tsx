import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Slices/userSlice/userSlice';
import AdminLogin from '../../pages/admin/AdminLogin';
import AdminDashboard from '../../pages/admin/AdminDashboard';

// const PrivateAdminRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
//   const user = useSelector(selectUser);
//   const isAuthenticated = !!user?.admin;
//   const location = useLocation();

//   return isAuthenticated ? (
//     <>{element}</>
//   ) : (
//     <Navigate to="/admin/login" state={{ from: location }} replace />
//   );
// };

// const PublicAdminRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
//   const user = useSelector(selectUser);
//   const isAuthenticated = !!user?.admin;

//   return isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <>{element}</>;
// };

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AdminRoutes;

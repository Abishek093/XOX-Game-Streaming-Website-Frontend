import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Slices/userSlice/userSlice';
import Signup from '../../pages/user/Signup';
import OtpPage from '../../pages/user/Otp';
import LoginPage from '../../pages/user/Login';
import Home from '../../pages/user/Home';
import Profile from '../../pages/user/Profile';

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const user = useSelector(selectUser);
  const isAuthenticated = !!user?.user;
  const location = useLocation();

  return isAuthenticated ? (
    <>{element}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const PublicRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const user = useSelector(selectUser);
  const isAuthenticated = !!user?.user;

  return isAuthenticated ? <Navigate to="/home" replace /> : <>{element}</>;
};

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/signup" element={<PublicRoute element={<Signup />} />} />
      <Route path="/otp" element={<PublicRoute element={<OtpPage />} />} />
      <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
    </Routes>
  );
};

export default UserRoutes;

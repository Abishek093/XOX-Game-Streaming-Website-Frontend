import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './Slices/userSlice/userSlice';
import Signup from './pages/user/Signup';
import OtpPage from './pages/user/Otp';
import LoginPage from './pages/user/Login';
import Home from './pages/user/Home';
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminNavbar from './components/Admin/AdminNavbar'
// import AdminSidebar from './components/Admin/AdminSidebar'
// import Cookies from 'js-cookie';


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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<PublicRoute element={<Signup />} />} />
        <Route path="/otp" element={<PublicRoute element={<OtpPage />} />} />
        <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
};

export default App;

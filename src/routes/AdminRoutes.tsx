
// import AdminLogin from '../../pages/admin/AdminLogin';
// import AdminDashboard from '../../pages/admin/AdminDashboard';

// const adminRoutes = [
//   {
//     path: 'admin/login',
//     element: <AdminLogin />,
//   },
//   {
//     path: 'admin/dashboard',
//     element: <AdminDashboard />,
//   },
// ];

// export default adminRoutes;
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ReportsPage from '../pages/admin/ReportsPage';

const adminRoutes = [
  {
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    path: 'reports',
    element: <ReportsPage />,
  },
];

const adminPublicRoutes = [
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
];

export { adminRoutes, adminPublicRoutes };

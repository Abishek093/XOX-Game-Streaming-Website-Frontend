
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

const adminRoutes = [
  {
    path: 'dashboard',
    element: <AdminDashboard />,
  },
];

const adminPublicRoutes = [
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
];

export { adminRoutes, adminPublicRoutes };

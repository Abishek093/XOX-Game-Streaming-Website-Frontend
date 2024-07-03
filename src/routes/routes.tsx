import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import userRoutes from './UserRoutes/UserRoutes';
import adminRoutes from './AdminRoutes/AdminRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      ...userRoutes,
      ...adminRoutes,
    ],
  },
]);

export default router;

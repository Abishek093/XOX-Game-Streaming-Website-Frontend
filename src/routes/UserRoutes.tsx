import Signup from '../pages/user/Signup';
import OtpPage from '../pages/user/Otp';
import LoginPage from '../pages/user/Login';
import Home from '../pages/user/Home';
import Profile from '../pages/user/Profile';
import ConfirmMail from '../pages/user/ConfirmMail';
import ConfirmPassword from '../pages/user/ConfirmPassword';
import Friends from '../pages/user/Friends';

const userRoutes = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/friends',
    element: <Friends />,
  },
  {
    path: '/userDetails/:id',
    element: <Profile />,
  },
];

const userPublicRoutes = [
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/otp',
    element: <OtpPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/confirm-mail',
    element: <ConfirmMail />,
  },
  {
    path: '/reset-password',
    element: <ConfirmPassword />,
  },
];

export { userRoutes, userPublicRoutes };

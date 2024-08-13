import Signup from '../pages/user/Signup';
import OtpPage from '../pages/user/Otp';
import LoginPage from '../pages/user/Login';
import Home from '../pages/user/Home';
import Profile from '../pages/user/Profile';
import ConfirmMail from '../pages/user/ConfirmMail';
import ConfirmPassword from '../pages/user/ConfirmPassword';
import Friends from '../pages/user/Friends';
import CommunityList from '../pages/user/CommunityList';
import Community from '../pages/user/Community';
import SettingsPage from '../pages/user/SettingsPage';

const userRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/:username',
    element: <Profile />,
  },
  {
    path: 'friends',
    element: <Friends />,
  },
  {
    path: 'community-list',
    element: <CommunityList />,
  },
  {
    path: 'community/:communityId',
    element: <Community />,
  },
  {
    path: 'settings',
    element: <SettingsPage />,
  },
];

const userPublicRoutes = [
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: 'otp',
    element: <OtpPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'confirm-mail',
    element: <ConfirmMail />,
  },
  {
    path: 'reset-password',
    element: <ConfirmPassword />,
  },
];

export { userRoutes, userPublicRoutes };

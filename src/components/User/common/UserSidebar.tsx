import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearUser, selectUser } from '../../../Slices/userSlice/userSlice';
import Cookies from 'js-cookie';
import { FaHome, FaUser, FaComments, FaUserFriends, FaWallet, FaNewspaper, FaUsers, FaStream, FaRegFileAlt, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { pathname } = location;

  const getNavLinkClass = (path: string) => {
    return pathname === path ? 'p-2 text-orange-500 border-l-4 border-orange-500 px-2' : 'px-2';
  };
  const hoverClass = 'hover:text-orange-500 hover:border-l-4 hover:px-2';

  const handleLogout = () => {
    dispatch(clearUser());
    Cookies.remove('accessToken');
    navigate('/login');
  };

  return (
    <div className="bg-[#ffff] text-gray-900 w-64 h-full flex flex-col p-2 drop-shadow-md sticky top-0 fixed">
      <div className="mb-12 drop-shadow-md">
        <h1 className="text-2xl font-bold text-orange-500 px-4 py-2">XOX</h1>
      </div>
      <div className="flex-1">
        <ul>
          <li className={`mb-10 ${getNavLinkClass('/home')} ${hoverClass}`}>
            <NavLink to="/home">
              <FaHome className="inline-block mr-2"/> Home
            </NavLink>
          </li>
          <li className="mb-10">ACCOUNT</li>
          <li className={`mb-6 ${getNavLinkClass('/profile')} ${hoverClass}`}>
            <NavLink to="/profile" className="inline-block mr-2">
              <FaUser className="inline-block mr-2"/> Profile
            </NavLink>
          </li>
          <li className={`mb-6 ${getNavLinkClass('/chats')}`}>
            <NavLink to="/chats">
              <FaComments className="inline-block mr-2"/> Chats
            </NavLink>
          </li>
          <li className={`mb-6 ${getNavLinkClass('/friends')}`}>
            <NavLink to="/friends">
              <FaUserFriends className="inline-block mr-2"/> Friends
            </NavLink>
          </li>
          <li className={`mb-10 ${getNavLinkClass('/wallet')}`}>
            <NavLink to="/wallet">
              <FaWallet className="inline-block mr-2"/> Wallet
            </NavLink>
          </li>
          <li className="mb-10">MAIN</li>
          <li className={`mb-6 ${getNavLinkClass('/news')}`}>
            <NavLink to="/news">
              <FaNewspaper className="inline-block mr-2"/> News
            </NavLink>
          </li>
          <li className={`mb-6 ${getNavLinkClass('/community')}`}>
            <NavLink to="/community">
              <FaUsers className="inline-block mr-2"/> Community
            </NavLink>
          </li>
          <li className={`mb-6 ${getNavLinkClass('/members')}`}>
            <NavLink to="/members">
              <FaUserFriends className="inline-block mr-2"/> Members
            </NavLink>
          </li>
          <li className={`mb-10 ${getNavLinkClass('/streams')}`}>
            <NavLink to="/streams">
              <FaStream className="inline-block mr-2"/> Streams
            </NavLink>
          </li>
          <li className="mb-10">ACCOUNT</li>
          <li className={`mb-6 ${getNavLinkClass('/report')}`}>
            <NavLink to="/report">
              <FaRegFileAlt className="inline-block mr-2"/> Report
            </NavLink>
          </li>
          <li className={`mb-6 ${getNavLinkClass('/help')}`}>
            <NavLink to="/help">
              <FaQuestionCircle className="inline-block mr-2"/> Help
            </NavLink>
          </li>
          <li className={`mb-10 p-2 ${hoverClass}`}>
            <button onClick={handleLogout} className="flex items-center w-full">
              <FaSignOutAlt className="inline-block mr-2" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

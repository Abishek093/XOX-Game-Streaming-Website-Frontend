// import React from 'react';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../../store/hooks';
// import { clearUser, selectUser } from '../../../Slices/userSlice/userSlice';
// import Cookies from 'js-cookie';
// import {
//   FaHome,
//   FaUser,
//   FaComments,
//   FaUserFriends,
//   FaWallet,
//   FaNewspaper,
//   FaUsers,
//   FaStream,
//   FaRegFileAlt,
//   FaQuestionCircle,
//   FaSignOutAlt,
//   FaCog,  // Added icon for Settings
// } from 'react-icons/fa';

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const user = useAppSelector(selectUser);
//   const { pathname } = location;

//   const getNavLinkClass = (path: string) => {
//     return pathname === path
//       ? 'p-2 text-orange-500 border-l-4 border-orange-500 px-2'
//       : 'px-2 hover:text-orange-500 hover:border-l-4 hover:px-2';
//   };

//   const handleLogout = () => {
//     dispatch(clearUser());
//     Cookies.remove('accessToken');
//     navigate('/login');
//   };

//   return (
//     <div className="bg-white text-gray-900 w-64 h-screen sticky top-0 flex flex-col px-1.5 drop-shadow-md overflow-y-auto scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-gray-500">
//       <div className="sticky top-0 mb-12 drop-shadow-md bg-white p-0">
//         <h1 className="text-2xl font-bold text-orange-500 px-4 py-2" onClick={()=>navigate('/')}>XOX</h1>
//       </div>
//       <div className="flex-1">
//         <ul>
//           <li className={`mb-10 ${getNavLinkClass('/')} hover:text-orange-500 hover:border-l-4 hover:px-2`}>
//             <NavLink to="/">
//               <FaHome className="inline-block mr-2" /> Home
//             </NavLink>
//           </li>
//           <li className="mb-10">ACCOUNT</li>
//           <li className={`mb-6 ${getNavLinkClass(`/${user?.username}`)} hover:text-orange-500 hover:border-l-4 hover:px-2`}>
//             <NavLink to={`/${user?.username}`} className="inline-block mr-2">
//               <FaUser className="inline-block mr-2" /> Profile
//             </NavLink>
//           </li>
//           <li className={`mb-6 ${getNavLinkClass('/chats')} hover:text-orange-500 hover:border-l-4 hover:px-2`}>
//             <NavLink to="/chats">
//               <FaComments className="inline-block mr-2" /> Chats
//             </NavLink>
//           </li>
//           <li className={`mb-6 ${getNavLinkClass('/friends')} hover:text-orange-500 hover:border-l-4 hover:px-2`}>
//             <NavLink to="/friends">
//               <FaUserFriends className="inline-block mr-2" /> Friends
//             </NavLink>
//           </li>
//           <li className={`mb-10 ${getNavLinkClass('/wallet')} hover:text-orange-500 hover:border-l-4 hover:px-2`}>
//             <NavLink to="/wallet">
//               <FaWallet className="inline-block mr-2" /> Wallet
//             </NavLink>
//           </li>
//           <li className="mb-10">MAIN</li>
//           <li className={`mb-6 ${getNavLinkClass('/news')} hover:text-orange-500 hover:border-l-4 hover:px-2`}>
//             <NavLink to="/news">
//               <FaNewspaper className="inline-block mr-2" /> News
//             </NavLink>
//           </li>
//           <li className={`mb-6 ${getNavLinkClass('/community-list')} hover:text-orange-500 hover:border-l-4 hover:px-2`}>
//             <NavLink to="/community-list">
//               <FaUsers className="inline-block mr-2" /> Community
//             </NavLink>
//           </li>
//           <li className={`mb-6 ${getNavLinkClass('/members')} hover:text-orange-500 hover:border-l-4 hover:px-2`}>
//             <NavLink to="/members">
//               <FaUserFriends className="inline-block mr-2" /> Members
//             </NavLink>
//           </li>
//           <li className={`mb-10 ${getNavLinkClass('/streams')} hover:text-orange-500 hover:border-l-4 hover:px-2`}>
//             <NavLink to="/streams">
//               <FaStream className="inline-block mr-2" /> Streams
//             </NavLink>
//           </li>
//           <li className="mb-10">SUPPORT</li>
//           <li className={`mb-6 ${getNavLinkClass('/report')} hover:text-orange-500 hover:border-l-4 hover:px-2`}>
//             <NavLink to="/report">
//               <FaRegFileAlt className="inline-block mr-2" /> Report
//             </NavLink>
//           </li>
//           <li className={`mb-6 ${getNavLinkClass('/help')} hover:text-orange-500 hover:border-l-4 hover:px-2`}>
//             <NavLink to="/help">
//               <FaQuestionCircle className="inline-block mr-2" /> Help
//             </NavLink>
//           </li>
//           <li className={`mb-6 ${getNavLinkClass('/settings')} hover:text-orange-500 hover:border-l-4 hover:px-2`}>
//             <NavLink to="/settings">
//               <FaCog className="inline-block mr-2" /> Settings
//             </NavLink>
//           </li>
//           <li className={`mb-10 p-2 hover:text-orange-500 hover:border-l-4 hover:px-2`}>
//             <button onClick={handleLogout} className="flex items-center w-full">
//               <FaSignOutAlt className="inline-block mr-2" /> Logout
//             </button>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearUser, selectUser } from '../../../Slices/userSlice/userSlice';
import Cookies from 'js-cookie';
import {
  FaHome,
  FaUser,
  FaComments,
  FaUserFriends,
  FaWallet,
  FaNewspaper,
  FaUsers,
  FaStream,
  FaRegFileAlt,
  FaQuestionCircle,
  FaSignOutAlt,
  FaCog,
} from 'react-icons/fa';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY + rect.height / 2,
        left: rect.right + window.scrollX + 10,
      });
    }
  }, [isVisible]);

  return (
    <div
      ref={triggerRef}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'absolute',
              top: `${position.top}px`,
              left: `${position.left}px`,
              transform: 'translateY(-50%)',
              zIndex: 9999,
            }}
            className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm dark:bg-gray-700 whitespace-nowrap"
          >
            {content}
          </div>,
          document.body
        )}
    </div>
  );
};


interface UserSidebarProps {
  iconsOnly: boolean;
}

const Sidebar: React.FC<UserSidebarProps> = ({ iconsOnly }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { pathname } = location;

  const isChatsPage = pathname === '/chats';

  const getNavLinkClass = (path: string) => {
    return pathname === path
      ? 'text-orange-500 border-l-4 border-orange-500'
      : 'text-gray-600 hover:text-orange-500 hover:border-l-4 border-orange-500';
  };

  const handleLogout = () => {
    dispatch(clearUser());
    Cookies.remove('accessToken');
    navigate('/login');
  };

  const renderNavItem = (path: string, icon: React.ReactNode, label: string) => (
    <li className={`mb-6 ${getNavLinkClass(path)}`}>
      <NavLink to={path} className="flex items-center px-4 py-2">
        {isChatsPage ? (
          <Tooltip content={label}>
            <div>{icon}</div>
          </Tooltip>
        ) : (
          <>
            {icon}
            <span className="ml-3">{label}</span>
          </>
        )}
      </NavLink>
    </li>
  );

  return (
    <div className={`bg-white ${isChatsPage ? 'w-20' : 'w-64'} h-screen sticky top-0 flex flex-col drop-shadow-md overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}> 
      <div className="sticky top-0 mb-6 bg-white p-4">
        <h1 className="text-2xl font-bold text-orange-500 cursor-pointer" onClick={() => navigate('/')}>XOX</h1>
      </div>
      <nav className="flex-1">
        <ul>
          {renderNavItem('/', <FaHome className="text-xl" />, "Home")}
          {!isChatsPage && <li className="mb-2 px-4 text-xs font-semibold text-gray-500 uppercase">Account</li>}
          {renderNavItem(`/${user?.username}`, <FaUser className="text-xl" />, "Profile")}
          {renderNavItem('/chats', <FaComments className="text-xl" />, "Chats")}
          {renderNavItem('/friends', <FaUserFriends className="text-xl" />, "Friends")}
          {renderNavItem('/wallet', <FaWallet className="text-xl" />, "Wallet")}
          {!isChatsPage && <li className="mt-6 mb-2 px-4 text-xs font-semibold text-gray-500 uppercase">Main</li>}
          {renderNavItem('/news', <FaNewspaper className="text-xl" />, "News")}
          {renderNavItem('/community-list', <FaUsers className="text-xl" />, "Community")}
          {renderNavItem('/members', <FaUserFriends className="text-xl" />, "Members")}
          {renderNavItem('/streams', <FaStream className="text-xl" />, "Streams")}
          {!isChatsPage && <li className="mt-6 mb-2 px-4 text-xs font-semibold text-gray-500 uppercase">Support</li>}
          {renderNavItem('/report', <FaRegFileAlt className="text-xl" />, "Report")}
          {renderNavItem('/help', <FaQuestionCircle className="text-xl" />, "Help")}
          {renderNavItem('/settings', <FaCog className="text-xl" />, "Settings")}
        </ul>
      </nav>
      <div className="mt-auto mb-6">
        <button onClick={handleLogout} className={`flex items-center w-full px-4 py-2 text-gray-600 hover:text-orange-500 ${isChatsPage ? 'justify-center' : ''}`}>
          {isChatsPage ? (
            <Tooltip content="Logout">
              <div><FaSignOutAlt className="text-xl" /></div>
            </Tooltip>
          ) : (
            <>
              <FaSignOutAlt className="text-xl" />
              <span className="ml-3">Logout</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UserSidebar from '../User/common/UserSidebar';
import UserNavbar from '../User/common/UserNavbar';
import { selectUser } from '../../Slices/userSlice/userSlice';
import { useAppSelector } from '../../store/hooks';

const UserLayout: React.FC = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-1 flex flex-col">
        <UserNavbar />
        <div className="p-4 bg-gray-100 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { clearUser, selectUser } from '../../Slices/userSlice/userSlice';
import Cookies from 'js-cookie';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (!token && !user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user?.user?.username || 'User'}!</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;

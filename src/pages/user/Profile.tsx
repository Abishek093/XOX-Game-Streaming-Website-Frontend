
import React, { useEffect, useState, useCallback } from 'react';
import UserTitleCard from '../../components/User/profile/UserTitleCard';
import UserProfileCard from '../../components/User/profile/UserProfileCard';
import PostFeed from '../../components/User/common/PostFeed';
import ProfileTabs from '../../components/User/profile/ProfileTabs';
// import FriendsCard from '../../components/User/profile/FriendsCard';
import InfoComponent from '../../components/User/profile/InfoComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../Slices/userSlice/userSlice';
import { GoogleUser, UserData, UserDetails } from '../../interfaces/userInterfaces/apiInterfaces';
import axiosInstance from '../../services/userServices/axiosInstance';

type Tab = 'posts' | 'info' | 'friends' | 'groups';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('posts');
  const [user, setUser] = useState<UserData | GoogleUser | UserDetails | null>(null);
  const [ownProfile, setOwnProfile] = useState<boolean>(false);
  const { username } = useParams<{ username: string }>();
  const loggedInUser = useAppSelector(selectUser);
  const navigate = useNavigate();

  const handleProfileUpdate = useCallback((username: string) => {
    setOwnProfile(true);
    navigate(`/${username}`);
  }, [navigate]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (loggedInUser?.username === username) {
          setUser(loggedInUser);
          setOwnProfile(true);
        } else {
          const { data } = await axiosInstance.get(`/users/${username}`);
          setUser(data);
          setOwnProfile(false);
        }
      } catch (error) {
        // handle error
      }
    };

    fetchUserProfile();
  }, [username, loggedInUser]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (loggedInUser?.username === username) {
          setUser(loggedInUser);
          setOwnProfile(true);
        } else {
          const { data } = await axiosInstance.get(`/users/${username}`);
          setUser(data);
          setOwnProfile(false);
        }
      } catch (error) {
        // handle error
      }
    };

    fetchUserProfile();
  }, [handleProfileUpdate]);
  
  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return <PostFeed user={user} />;
      case 'info':
        return <InfoComponent onProfileUpdate={handleProfileUpdate} />;
      // case 'friends':
      //   return <FriendsList />;
      // case 'groups':
      //   return <GroupsList />;
      default:
        return <PostFeed user={user} />;
    }
  };

  return (
    <div className="flex bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3">
            <UserTitleCard activeTab={activeTab} user={user} />
          </div>
          <div className="col-span-3">
            <ProfileTabs setActiveTab={setActiveTab} ownProfile={ownProfile} />
          </div>
          <div style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }} className="col-span-3 overflow-y-scroll h-[53vh]">
            {renderContent()}
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <UserProfileCard user={user} ownProfile={ownProfile} />
      </div>
    </div>
  );
};

export default Profile;

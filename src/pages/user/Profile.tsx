import React, { useState } from 'react';
import UserTitleCard from '../../components/User/profile/UserTitleCard';
import UserProfileCard from '../../components/User/profile/UserProfileCard';
import PostFeed from '../../components/User/common/PostFeed';
import ProfileTabs from '../../components/User/profile/ProfileTabs';
// import FriendsCard from '../../components/User/profile/FriendsCard';
import InfoComponent from '../../components/User/profile/InfoComponent';

type Tab = 'posts' | 'info' | 'friends' | 'groups';


const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('posts');

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return <PostFeed />;
      case 'info':
        return <InfoComponent />;
      // case 'friends':
      //   return <FriendsList />;
      // case 'groups':
      //   return <GroupsList />;
      default:
        return <PostFeed />;
    }
  };
  return (
    <>
      <div className='flex bg-gray-100'>
        <div className='flex-1 flex flex-col'>
          <div className='grid grid-flow-row-dense grid-cols-3 grid-rows-auto gap-4 '>
          <div className="col-span-2 "><UserTitleCard/></div>
          <div className="col-span-2"><ProfileTabs setActiveTab={setActiveTab}/></div>
          <div className="col-span-2">{renderContent()}</div>
          <div className=""><UserProfileCard/></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

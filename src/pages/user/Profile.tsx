// import React from 'react';
// import { Container, Row, Col } from 'react-grid-system';
// import Sidebar from '../../components/User/common/UserSidebar';
// import Navbar from '../../components/User/common/UserNavbar';
// import UserTitleCard from '../../components/User/profile/UserTitleCard';
// import UserProfileCard from '../../components/User/profile/UserProfileCard';
// import PostFeed from '../../components/User/common/PostFeed';
// import ProfileTabs from '../../components/User/profile/ProfileTabs';
// import FriendsCard from '../../components/User/profile/FriendsCard';

// const Profile: React.FC = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 flex flex-col bg-gray-200">
//         <Navbar />
//         <div className='flex flex-col space-y-10 px-20 py-12'>
//           <div className='flex space-x-32'>
//             <UserTitleCard />
//             <UserProfileCard />
//           </div>
//           <div className='flex flex-row space-x-32'> 
//             <ProfileTabs />
//             <FriendsCard />
//           </div>
//           <PostFeed />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Sidebar from '../../components/User/common/UserSidebar';
import Navbar from '../../components/User/common/UserNavbar';
import UserTitleCard from '../../components/User/profile/UserTitleCard';
import UserProfileCard from '../../components/User/profile/UserProfileCard';
import PostFeed from '../../components/User/common/PostFeed';
import ProfileTabs from '../../components/User/profile/ProfileTabs';
import FriendsCard from '../../components/User/profile/FriendsCard';
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
      <div className='flex bg-gray-200'>
        <Sidebar />
        <div className='flex-1 flex flex-col'>
          <Navbar />
          <div className='grid grid-flow-row-dense grid-cols-3 grid-rows-auto gap-4 px-12 py-20'>
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

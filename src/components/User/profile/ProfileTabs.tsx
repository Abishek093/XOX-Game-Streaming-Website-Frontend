// import React from 'react';
// import { Container, Row, Col } from 'react-grid-system';
// import { FaHome, FaGamepad, FaUserFriends, FaInfo} from 'react-icons/fa';

// const ProfileTabs: React.FC = () => {
//   return (
//     <div className="w-8/12 h-20 bg-white drop-shadow-sm">
//         <div className="grid grid-cols-8 gap-4 text-gray text-font-bold text-center font-bold">
//         <button className="justify-self-center py-6 flex items-center"><FaHome/>Overview</button>
//         <button className="justify-self-center py-6 flex items-center"><FaGamepad/>Groups</button>
//         <button className="justify-self-center py-6 flex items-center"><FaUserFriends/>Friends</button>
//         <button className="justify-self-center py-6 flex items-center"><FaInfo/>Info</button>
//         </div>
//     </div>
//   );
// };

// export default ProfileTabs;
import React from 'react';
import { FaHome, FaGamepad, FaUserFriends, FaInfo, FaFileImage } from 'react-icons/fa';

interface ProfileTabsProps {
    setActiveTab: (tab: 'posts' | 'info' | 'friends' | 'groups') => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ setActiveTab }) => {
  return (
    <div className=" bg-white drop-shadow-sm">
      <div className="grid grid-cols-8 gap-4 text-gray text-font-bold text-center font-bold">
        <button className="justify-self-center py-6 flex items-center" onClick={() => setActiveTab('posts')}>
          <FaFileImage /> Posts
        </button>
        {/* <button className="justify-self-center py-6 flex items-center" onClick={() => setActiveTab('groups')}>
          <FaGamepad /> Groups
        </button>
        <button className="justify-self-center py-6 flex items-center" onClick={() => setActiveTab('friends')}>
          <FaUserFriends /> Friends
        </button> */}
        <button className="justify-self-center py-6 flex items-center" onClick={() => setActiveTab('info')}>
          <FaInfo /> Info
        </button>
      </div>
    </div>
  );
};

export default ProfileTabs;

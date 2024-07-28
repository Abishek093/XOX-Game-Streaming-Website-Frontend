import React from 'react';
import { FaGamepad, FaUserFriends, FaInfo, FaFileImage } from 'react-icons/fa';

interface ProfileTabsProps {
  setActiveTab: (tab: 'posts' | 'info' | 'friends' | 'groups') => void;
}

interface OwnProfileProps {
  ownProfile: boolean;
}

interface CombinedProps extends ProfileTabsProps, OwnProfileProps {}

const ProfileTabs: React.FC<CombinedProps> = ({ setActiveTab, ownProfile }) => {
  // Add a log to check ownProfile
  console.log("ownProfile in ProfileTabs component:", ownProfile);
  
  return (
    <div className="bg-white drop-shadow-sm">
      <div className="grid grid-cols-12 gap-2 text-gray font-sans text-center">
        <button className="justify-self-center py-6 flex items-center" onClick={() => setActiveTab('posts')}>
          <FaFileImage className="mr-2" /> Posts
        </button>
        {ownProfile && (
          <>
            <button className="justify-self-center py-6 flex items-center" onClick={() => setActiveTab('groups')}>
              <FaGamepad className="mr-2" /> Groups
            </button>
            <button className="justify-self-center py-6 flex items-center" onClick={() => setActiveTab('friends')}>
              <FaUserFriends className="mr-2" /> Friends
            </button>
            <button className="justify-self-center py-6 flex items-center" onClick={() => setActiveTab('info')}>
              <FaInfo/> Info
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileTabs;

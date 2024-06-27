import React from 'react';
import CommunityCard from './CommunityCard';

const Communities: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl text-gray-900 mb-4">Our Communities</h2>
      <div className="grid grid-cols-4 gap-4 h-4/5">
        <CommunityCard name="Community 1" posts={120} members={450} imageUrl="assets/banner/community.jpg" />
        <CommunityCard name="Community 1" posts={120} members={450} imageUrl="assets/banner/community.jpg" />
        <CommunityCard name="Community 1" posts={120} members={450} imageUrl="assets/banner/community.jpg" />
        <CommunityCard name="Community 1" posts={120} members={450} imageUrl="assets/banner/community.jpg" />
      </div>
    </div>
  );
};

export default Communities;

import React from 'react';
import Sidebar from '../../components/User/common/UserSidebar';
import Navbar from '../../components/User/common/UserNavbar';
import RecommendedEvents from '../../components/User/home/RecommendedEvents';
import NewsArchive from '../../components/User/home/NewsArchive';
import Communities from '../../components/User/home/Communities';

const Home: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-4 bg-gray-100 flex-1 p-12">
          <div className="flex mb-24 space-x-4">
            <RecommendedEvents />
            <NewsArchive />
          </div>
          <Communities />
        </div>
      </div>
    </div>
  );
};

export default Home;

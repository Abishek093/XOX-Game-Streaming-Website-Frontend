import React, { useEffect, useState } from 'react';
import CommunityListTitleCard from '../../components/User/community/CommunityListTitleCard';
import CreateCommunityModal from '../../components/User/community/CreateCommunityModal';
import axiosInstance from '../../services/userServices/axiosInstance';
import { toast } from 'sonner';
import CommunityCard from '../../components/User/home/CommunityCard';
import { ICommunityWithCounts } from '../../interfaces/userInterfaces/apiInterfaces'; 

const CommunityList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [communities, setCommunities] = useState<ICommunityWithCounts[]>([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const { data } = await axiosInstance.get<ICommunityWithCounts[]>('fetch-all-communities');
        setCommunities(data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchCommunities();
  }, []);

  return (
    <div className="relative p-4  h-[91vh] flex flex-col">
      {/* Fixed Title Card Section */}
      <div className="flex-shrink-0">
        <CommunityListTitleCard
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>

      {/* Scrollable Community List Section */}
      <div className="flex-grow overflow-y-auto mt-4" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {communities.map((community) => (
            <CommunityCard 
              communityId={community._id}
              name={community.name}
              posts={community.postCount}
              members={community.followerCount}
              imageUrl={community.image || '/default-image.jpg'}
            />
          ))}
        </div>
      </div>

      {/* Modal for Creating Community */}
      {isModalOpen && (
        <CreateCommunityModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default CommunityList;

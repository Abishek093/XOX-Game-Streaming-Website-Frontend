import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../Slices/userSlice/userSlice';
import axiosInstance from '../../services/userServices/axiosInstance';
import { toast } from 'sonner';
import CommunityTitleCard from '../../components/User/community/CommunityTitleCard';
// import CommunityPosts from '../../components/User/community/CommunityPosts';
// import EditCommunity from '../../components/User/community/EditCommunity';
import { FaEdit, FaListAlt, FaPlus } from 'react-icons/fa';
import ImageUploadModal from '../../components/Common/ImageUploadModal';
import Post from '../../components/User/common/Post';
import EditCommunity from '../../components/User/community/EditCommunity';


interface CommunityData {
  _id: string;
  name: string;
  description?: string;
  createdBy: string;
  followers: string[];
  posts: any[]; // Adjust the type based on the structure of post data
  postPermission: 'admin' | 'anyone';
  image?: string;
  createdAt: string;
  updatedAt: string;
}

const Community: React.FC = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const [community, setCommunity] = useState<CommunityData | null>(null);
  const [isAdminView, setIsAdminView] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false)


  const owner = useAppSelector(selectUser);
  const userName = owner.username
  useEffect(() => {
    const fetchCommunityDetails = async () => {
      try {
        const { data } = await axiosInstance.get(`fetch-community/${communityId}`);
        console.log('data', data)
        setCommunity(data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchCommunityDetails();
  }, [communityId]);



  const handlePostCreation = async (croppedImage: string, _isProfileImage?: boolean, description?: string) => {
    try {
      const base64String = croppedImage.split(",")[1];
      const result = await axiosInstance.post(`community-post`, { userName, croppedImage: base64String, description, communityId })
      if (result.status === 200) {
        toast.success("Post added successfully")
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  };

  return (
    <div className="relative p-4 h-[91vh] flex flex-col">
      <div className="flex-shrink-0">
        <CommunityTitleCard
          image={community?.image}
          name={community?.name}
          description={community?.description}
          postCount={community?.posts.length}
          followersCount={community?.followers.length}
        />
      </div>

      {/* Admin Control Bar */}
      {owner?.id === community?.createdBy && (
        <div className="flex justify-center my-4 space-x-4">
          <button
            className={`flex items-center px-6 py-2 rounded-full transition-all duration-300 transform ${isAdminView
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:scale-105'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            onClick={() => setIsAdminView(true)}
          >
            <FaListAlt className="mr-2" />
            Posts
          </button>
          <button
            className={`flex items-center px-6 py-2 rounded-full transition-all duration-300 transform ${!isAdminView
              ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg hover:scale-105'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            onClick={() => setIsAdminView(false)}
          >
            <FaEdit className="mr-2" />
            Edit Community
          </button>
        </div>
      )}

      {/* Floating Create Post Button */}
      {(community?.postPermission === 'anyone' || owner?.id === community?.createdBy) && (
        <button
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300 transform"
          onClick={() => { setIsModalOpen(true) }}
        >
          <FaPlus className="text-2xl" />
        </button>
      )}

      {/* Admin or User View */}
      <div className="flex-grow">
        {owner?.id === community?.createdBy ? (
          isAdminView ? (
            <div style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }} className="col-span-3 overflow-y-scroll h-[53vh]">
              {
                community?.posts.map((post) => (
                  <Post
                    key={post._id}
                    user={post.author}
                    post={post}
                  />
                ))
              }
            </div>

          ) : (
            <div style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }} className="col-span-3 overflow-y-scroll h-[53vh]">
              <EditCommunity
                community={community}
                onCommunityUpdate={(updatedCommunity) => setCommunity(updatedCommunity)}
              />
            </div>
          )
        ) : (
          <div style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }} className="col-span-3 overflow-y-scroll h-[53vh]">
            {
              community?.posts.map((post) => (
                <Post
                  key={post._id}
                  user={post.author}
                  post={post}
                />
              ))
            }
          </div>
        )}

      </div>
      {
        isModalOpen && (
          <ImageUploadModal
            isOpen={isModalOpen}
            profile={false}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handlePostCreation}
            isPost={true}
          // aspectRatio={aspectRatio}
          />
        )
      }
    </div>
  );
};

export default Community;

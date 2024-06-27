import React from 'react';

interface CommunityCardProps {
  name: string;
  posts: number;
  members: number;
  imageUrl: string;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ name, posts, members, imageUrl }) => {
  return (
    <div className="bg-gray-200 text-gray-800 w-[374.25px] h-[500.59px] flex flex-col p-2.5">
      <div className="relative w-[354.25px] h-[354.25px]">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 left-2 text-white">
          <p className="text-sm">Private</p>
        </div>
      </div>
      <div className="w-[354.25px] p-4 flex flex-col justify-evenly gap-x-16">
      <div className='flex justify-evenly gap-x-16'>
         <div className="mb-4 flex flex-col text-center">
            <h3 className="text-xl font-bold">{posts}</h3>
            <h2 className="text-sm ">Posts</h2>
         </div>
         <div className="mb-4 flex flex-col text-center">
            <h3 className="text-xl font-bold">{members}</h3>
            <h2 className="text-sm ">Members</h2>
         </div>
      </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Join Community
        </button>
      </div>
    </div>
  );
};

export default CommunityCard;

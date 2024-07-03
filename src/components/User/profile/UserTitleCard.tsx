import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { selectUser } from '../../../Slices/userSlice/userSlice';


const UserTitleCard: React.FC = () => {
  const user = useAppSelector(selectUser);
  const defaultProfileImage = "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1719396828~exp=1719400428~hmac=3992078a184c24bf98ee7b06afbab8f3bad2a1d00f616f2b7a906e219f974cb1&w=740"
  const defaultTitleImage =' https://pro-theme.com/html/teamhost/assets/img/heading3.jpg'
  console.log(user,"user in userTitleCard");
  

  return (
    <div className=" h-64 bg-gray-800 p-4 flex flex-col justify-center items-center relative">
      <img
        src={user?.user?.titleImage || defaultTitleImage}
        alt="Title"
        className="object-cover w-full h-full absolute top-0 left-0 z-0"
      />
      <div className="flex flex-col items-center">
        <div className="w-[100px] h-[100px] rounded-full bg-white mb-2 relative overflow-hidden">
          <img
            src={user?.user?.profileImage || defaultProfileImage}
            className="object-cover w-full h-full"
            alt="Profile"
          />
        </div>
        <h1 className="uk-page-heading-style-a uk-page-heading-h text-white text-xl font-bold z-10">
          {user?.user?.username || 'User'}
        </h1>
        <p className="text-white text-base">
          {user?.user?.bio || ''}
        </p>
      </div>
    </div>
  );
};

export default UserTitleCard;

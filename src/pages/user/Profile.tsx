import React, { useEffect, useState, useCallback } from 'react';
import UserTitleCard from '../../components/User/profile/UserTitleCard';
import UserProfileCard from '../../components/User/profile/UserProfileCard';
import PostFeed from '../../components/User/common/PostFeed';
import ProfileTabs from '../../components/User/profile/ProfileTabs';
import InfoComponent from '../../components/User/profile/InfoComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectUser, updateUser, updateProfieImage, updateTitleImage } from '../../Slices/userSlice/userSlice';
import { GoogleUser, UserData, UserDetails, ImageUploadValues } from '../../interfaces/userInterfaces/apiInterfaces';
import axiosInstance from '../../services/userServices/axiosInstance';
import { toast } from 'sonner';
import LoadingPage from '../../components/Common/LoadingPage';

type Tab = 'posts' | 'info' | 'friends' | 'groups';

interface FormValues {
  userId: string;
  username: string;
  displayName: string;
  bio: string;
  profileImage: string;
  titleImage: string;
}

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('posts');
  const [user, setUser] = useState<UserData | GoogleUser | UserDetails | null>(null);
  const [ownProfile, setOwnProfile] = useState<boolean>(false);
  const { username } = useParams<{ username: string }>();
  const loggedInUser = useAppSelector(selectUser);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fetchUserProfile = useCallback(async (username: string) => {
    try {
      const isOwnProfile = loggedInUser?.username === username;
      if (isOwnProfile) {
        setUser(loggedInUser);
        setOwnProfile(true);
      } else {
        const { data } = await axiosInstance.get(`/users/${username}`);
        setUser(data);
        setOwnProfile(false);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (username) {
      fetchUserProfile(username);
    }
  }, [username, fetchUserProfile]);

  const handleProfileUpdate = useCallback((newUsername: string) => {
    setOwnProfile(true);  
    if (newUsername !== username) {
      fetchUserProfile(newUsername).then(() => {
        navigate(`/${newUsername}`);
      });
    }
  }, [navigate, username, fetchUserProfile]);


  const follow = async()=>{

  }


  const onSubmit = async (values: FormValues) => {
    const result = await dispatch(updateUser(values));
    if (updateUser.fulfilled.match(result)) {
      handleProfileUpdate(result.payload.user.username);
    }
  };

  const getInitialValues = (user: UserData | GoogleUser | UserDetails | null): FormValues => {
    if (!user) {
      return {
        userId: '',
        username: '',
        displayName: '',
        bio: '',
        profileImage: '',
        titleImage: ''
      };
    }
    return {
      userId: user.id || '',
      username: user.username,
      displayName: user.displayName || '',
      bio: user.bio || '',
      profileImage: user.profileImage || '',
      titleImage: user.titleImage || ''
    };
  };

  const initialValues = getInitialValues(user);

  const handleProfileImageUpload = async (croppedImage: string) => {
    try {
      const base64String = croppedImage.split(",")[1];
      const values: ImageUploadValues = {
        userId: loggedInUser?.id || "",
        username: loggedInUser?.username || "",
        profileImage: base64String,
        titleImage: "",
      };

      const response = await dispatch(updateProfieImage(values));
      if (updateProfieImage.fulfilled.match(response)) {
        setUser((prevUser) => prevUser ? { ...prevUser, profileImage: response.payload.profileImageUrl } : prevUser);
        navigate(`/${username}`);
      } else {
        toast.error("Profile image upload failed.");
      }
    } catch (error: any) {
      toast.error("Image upload failed.");
    }
  };

  const handleTitleImageUpload = async (croppedImage: string) => {
    try {
      const base64String = croppedImage.split(",")[1];
      const values: ImageUploadValues = {
        userId: loggedInUser?.id || "",
        username: loggedInUser?.username || "",
        profileImage: "",
        titleImage: base64String,
      };

      const response = await dispatch(updateTitleImage(values));
      if (updateTitleImage.fulfilled.match(response)) {
        navigate(`/${username}`);
      } else {
        toast.error("Title image upload failed.");
      }
    } catch (error: any) {
      toast.error("Image upload failed.");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return <PostFeed user={user} />;
      case 'info':
        return <InfoComponent onSubmit={onSubmit} initialValues={initialValues} />;
      default:
        return <PostFeed user={user} />;
    }
  };


  return (
    <div className="flex bg-gray-100">
      {user ? (
        <>
          <div className="flex-1 flex flex-col">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <UserTitleCard
                  activeTab={activeTab}
                  user={user}
                  onProfileImageUpload={handleProfileImageUpload}
                  onTitleImageUpload={handleTitleImageUpload}
                />
              </div>
              <div className="col-span-3">
                <ProfileTabs setActiveTab={setActiveTab} ownProfile={ownProfile} />
              </div>
              <div style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }} className="col-span-3 overflow-y-scroll h-[53vh]">
                {renderContent()}
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <UserProfileCard user={user} ownProfile={ownProfile} />
          </div>
        </>
      ) : (
        <div>Loading user data...</div>
      )}
    </div>
  );
};

export default Profile;

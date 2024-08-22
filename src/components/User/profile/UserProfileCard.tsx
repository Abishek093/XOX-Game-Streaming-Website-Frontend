// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   Avatar,
//   Typography,
//   Button,
//   Box,
// } from "@mui/material";
// import {
//   UserData,
//   GoogleUser,
//   UserDetails,
//   AspectRatio,
// } from "../../../interfaces/userInterfaces/apiInterfaces";
// import ImageUploadModal from "../../Common/ImageUploadModal";
// import axiosInstance from "../../../services/userServices/axiosInstance";
// import { toast } from "sonner";
// import { useAppSelector } from "../../../store/hooks";
// import { selectUser } from "../../../Slices/userSlice/userSlice";
// import { useLoading } from "../../../context/LoadingContext";

// interface UserTitleCardProps {
//   user: UserData | GoogleUser | UserDetails | null;
// }
// interface OwnProfileProps {
//   ownProfile: boolean;
// }

// interface CombinedProps extends UserTitleCardProps, OwnProfileProps {}

// const UserProfileCard: React.FC<CombinedProps> = ({ user, ownProfile }) => {
//   const defaultProfileImage =
//     "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1719396828~exp=1719400428~hmac=3992078a184c24bf98ee7b06afbab8f3bad2a1d00f616f2b7a906e219f974cb1&w=740";

//   const sampleData = {
//     profileImage:
//       "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1719396828~exp=1719400428~hmac=3992078a184c24bf98ee7b06afbab8f3bad2a1d00f616f2b7a906e219f974cb1&w=740",
//     followers: 1200,
//     following: 300,
//     posts: 45,
//   };

//   const [followers, setFollowers] = useState<number>(0);
//   const [following, setFollowing] = useState<number>(0);
//   const {setLoading} = useLoading()

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [localProfileImage, setLocalProfileImage] = useState(
//     user?.profileImage || defaultProfileImage
//   );
//   const [aspectRatio, setAspectRatio] = useState<AspectRatio>({
//     shape: "rect",
//     aspect: [700 / 400, 1020 / 400],
//   });
//   const ownuser = useAppSelector(selectUser)
//   const handlePostCreation = async (croppedImage: string, _isProfileImage?: boolean, description?: string) => {
//     setLoading(true)
//     try {
//       const base64String = croppedImage.split(",")[1];
//       const API_URL = import.meta.env.VITE_USER_API_URL;
//         console.log('base64String',base64String)
//         const username = user?.username
//         const result = await axiosInstance.post(`${API_URL}create-post`, {username, croppedImage: base64String, description})
//         console.log('result',result)
//         if(result.status === 200){
//           toast.success("Post added successfully")
//         }
//     } catch (error: any) {
//       toast.error(error.message)
//     }finally{
//       setLoading(false)
//     }
//   };

//   const handlefollow = async()=>{
//     try {
//       const follow = await axiosInstance.post(`/follower/${ownuser?.id}/user/${user?.id}`)
//     } catch (error: any) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     const fetchUserConnections = async (userId: string) => {
//       try {
//         const followersResult = await axiosInstance.get(`/fetchFollowers/${userId}`);
//         console.log('followersResult',followersResult)
//         setFollowers(followersResult.data.length);

//         const followingResult = await axiosInstance.get(`/fetchFollowing/${userId}`);
//         console.log('followingResult',followingResult)
//         setFollowing(followingResult.data.length);

//       } catch (error) {
//         console.error('Failed to fetch user connections:', error);
//       }
//     };

//     if (user?.id) {
//       fetchUserConnections(user.id);
//     }
//   }, [user]);

//   const getCachedImageUrl = (imageUrl?: string) => {
//     return imageUrl
//       ? `${imageUrl}?t=${new Date().getTime()}`
//       : defaultProfileImage;
//   };

//   return (
//     <Card
//       sx={{
//         maxWidth: 400,
//         margin: "auto",
//         boxShadow: 3,
//         marginRight: "0px",
//         height: "400px",
//       }}
//     >
//       {
//         ownProfile ? (
//           <Avatar
//           src={getCachedImageUrl(localProfileImage) || defaultProfileImage}
//           sx={{
//             width: 100,
//             height: 100,
//             margin: "auto",
//             marginTop: "48px",
//             border: "3px solid white",
//           }}
//         />
//         ):(

//           <Avatar
//           src={getCachedImageUrl(localProfileImage) || defaultProfileImage}
//           sx={{
//             width: 100,
//             height: 100,
//             margin: "auto",
//             marginTop: "48px",
//             border: "3px solid white",
//           }}
//         />
//         )
//       }

//       <CardContent>
//         <Typography
//           gutterBottom
//           variant="h5"
//           component="div"
//           align="center"
//           marginBottom="0px"
//         >
//           {user?.username}
//         </Typography>
//         <Typography
//           gutterBottom
//           variant="h6"
//           component="div"
//           align="center"
//           marginBottom="20px"
//         >
//           {user?.displayName}
//         </Typography>
//         <Box display="flex" justifyContent="space-around" alignItems="center">
//           <Box textAlign="center">
//             <Typography variant="h6">{followers}</Typography>
//             <Typography variant="body2" color="textSecondary">
//               Followers
//             </Typography>
//           </Box>
//           <Box textAlign="center">
//             <Typography variant="h6">{following}</Typography>
//             <Typography variant="body2" color="textSecondary">
//               Following
//             </Typography>
//           </Box>
//           <Box textAlign="center">
//             <Typography variant="h6">{sampleData.posts}</Typography>
//             <Typography variant="body2" color="textSecondary">
//               Posts
//             </Typography>
//           </Box>
//         </Box>
//         {ownProfile? (
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={() => {
//               setIsModalOpen(true);
//               setAspectRatio({
//                 shape: "rect",
//                 aspect: [700 / 400, 1020 / 400],
//               });
//             }}
//             sx={{ marginTop: 2 }}
//           >
//             Create Post
//           </Button>
//         ):(
//           <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={() => {
//             handlefollow()
//           }}
//           sx={{ marginTop: 2 }}
//         >
//           Follow
//         </Button>
//         )}
//       </CardContent>
//       <ImageUploadModal
//         isOpen={isModalOpen}
//         profile={false}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={handlePostCreation}
//         isPost={true}
//         // aspectRatio={aspectRatio}
//       />
//     </Card>
//   );
// };

// export default UserProfileCard;

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import {
  UserData,
  GoogleUser,
  UserDetails,
  AspectRatio,
} from "../../../interfaces/userInterfaces/apiInterfaces";
import ImageUploadModal from "../../Common/ImageUploadModal";
import axiosInstance from "../../../services/userServices/axiosInstance";
import { toast } from "sonner";
import { useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../Slices/userSlice/userSlice";
import { useLoading } from "../../../context/LoadingContext";

// interface UserTitleCardProps {
//   user: UserData | GoogleUser | UserDetails | null;
// }
// interface OwnProfileProps {
//   ownProfile: boolean;
// }
interface UserProfileCardProps {
  user: UserData | GoogleUser | UserDetails | null;
  ownProfile: boolean;
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
}


// interface CombinedProps extends UserTitleCardProps, OwnProfileProps {}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  ownProfile,
  setPosts,
}) => {
  const defaultProfileImage =
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1719396828~exp=1719400428~hmac=3992078a184c24bf98ee7b06afbab8f3bad2a1d00f616f2b7a906e219f974cb1&w=740";

  const sampleData = {
    profileImage:
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1719396828~exp=1719400428~hmac=3992078a184c24bf98ee7b06afbab8f3bad2a1d00f616f2b7a906e219f974cb1&w=740",
    followers: 1200,
    following: 300,
    posts: 45,
  };

  const [followers, setFollowers] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);
  const [followStatus, setFollowStatus] = useState<
    "Rejected" | "NotFollowing" | "Requested" | "Accepted"
  >("NotFollowing");
  const { setLoading } = useLoading();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localProfileImage, setLocalProfileImage] = useState(
    user?.profileImage || defaultProfileImage
  );
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>({
    shape: "rect",
    aspect: [700 / 400, 1020 / 400],
  });
  const ownUser = useAppSelector(selectUser);

  const handlePostCreation = async (
    croppedImage: string,
    _isProfileImage?: boolean,
    description?: string
  ) => {
    setLoading(true);
    try {
      const base64String = croppedImage.split(",")[1];
      const API_URL = import.meta.env.VITE_USER_API_URL;
      const username = user?.username;
      const result = await axiosInstance.post(`${API_URL}create-post`, {
        username,
        croppedImage: base64String,
        description,
      });
      const newPost = result.data
      setPosts((prevPosts) => [...prevPosts, newPost]);

      if (result.status === 200) {
        toast.success("Post added successfully");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      const follow = await axiosInstance.post(
        `/follower/${ownUser?.id}/user/${user?.id}`
      );
      if (follow.data.status === "Requested") {
        setFollowStatus("Requested");
      } else if (follow.data.status === "Accepted") {
        setFollowStatus("Accepted");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axiosInstance.delete(`/follower/${ownUser?.id}/user/${user?.id}`);
      setFollowStatus("NotFollowing");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchUserConnections = async (userId: string) => {
      try {
        const followersResult = await axiosInstance.get(
          `/fetchFollowers/${userId}`
        );
        setFollowers(followersResult.data.length);

        const followingResult = await axiosInstance.get(
          `/fetchFollowing/${userId}`
        );
        setFollowing(followingResult.data.length);

        const followStatusResult = await axiosInstance.get(
          `/followerStatus/${ownUser?.id}/user/${userId}`
        );
        console.log("followStatusResult.data", followStatusResult.data);
        setFollowStatus(followStatusResult.data.status);
      } catch (error) {
        console.error("Failed to fetch user connections:", error);
      }
    };

    if (user?.id) {
      fetchUserConnections(user.id);
    }
  }, [user, ownUser]);

  const getCachedImageUrl = (imageUrl?: string) => {
    return imageUrl
      ? `${imageUrl}?t=${new Date().getTime()}`
      : defaultProfileImage;
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        boxShadow: 3,
        marginRight: "0px",
        height: "400px",
      }}
    >
      <Avatar
        src={getCachedImageUrl(localProfileImage) || defaultProfileImage}
        sx={{
          width: 100,
          height: 100,
          margin: "auto",
          marginTop: "48px",
          border: "3px solid white",
        }}
      />

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          align="center"
          marginBottom="0px"
        >
          {user?.username}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          align="center"
          marginBottom="20px"
        >
          {user?.displayName}
        </Typography>
        <Box display="flex" justifyContent="space-around" alignItems="center">
          <Box textAlign="center">
            <Typography variant="h6">{followers}</Typography>
            <Typography variant="body2" color="textSecondary">
              Followers
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6">{following}</Typography>
            <Typography variant="body2" color="textSecondary">
              Following
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6">{sampleData.posts}</Typography>
            <Typography variant="body2" color="textSecondary">
              Posts
            </Typography>
          </Box>
        </Box>
        {ownProfile ? (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              setIsModalOpen(true);
              setAspectRatio({
                shape: "rect",
                aspect: [700 / 400, 1020 / 400],
              });
            }}
            sx={{ marginTop: 2 }}
          >
            Create Post
          </Button>
        ) : followStatus === "NotFollowing" || followStatus === "Rejected" ? (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFollow}
            sx={{ marginTop: 2 }}
          >
            Follow
          </Button>
        ) : followStatus === "Requested" ? (
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            disabled
            sx={{ marginTop: 2 }}
          >
            Requested
          </Button>
        ) : (
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleUnfollow}
              sx={{ marginRight: 1 }}
            >
              Unfollow
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginLeft: 1 }}
            >
              Message
            </Button>
          </Box>
        )}
      </CardContent>
      <ImageUploadModal
        isOpen={isModalOpen}
        profile={false}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePostCreation}
        isPost={true}
      />
    </Card>
  );
};

export default UserProfileCard;

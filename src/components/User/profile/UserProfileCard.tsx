// import React, { useState } from 'react';
// import { Card, CardContent, CardMedia, Typography, Button, Box, Avatar, Grid } from '@mui/material';
// import { UserData, GoogleUser, UserDetails, AspectRatio } from '../../../interfaces/userInterfaces/apiInterfaces';
// import ImageUploadModal from '../../Common/ImageUploadModal';

// interface UserTitleCardProps {
//   user: UserData | GoogleUser | UserDetails | null;
// }
// interface OwnProfileProps {
//   ownProfile: boolean;
// }

// interface CombinedProps extends UserTitleCardProps, OwnProfileProps { }


// const UserProfileCard: React.FC<CombinedProps> = ({ user, ownProfile }) => {
//   const defaultProfileImage =
//     "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1719396828~exp=1719400428~hmac=3992078a184c24bf98ee7b06afbab8f3bad2a1d00f616f2b7a906e219f974cb1&w=740";

//   const sampleData = {
//     profileImage: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1719396828~exp=1719400428~hmac=3992078a184c24bf98ee7b06afbab8f3bad2a1d00f616f2b7a906e219f974cb1&w=740',
//     followers: 1200,
//     following: 300,
//     posts: 45,
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [aspectRatio, setAspectRatio] = useState<AspectRatio>({ shape: "rect", aspect: [700 / 400, 1020 / 400] });

//   const handleImageUpload = (croppedImage: string, description: string) => {
    
//   }
//   return (
//     <Card sx={{ maxWidth: 400, margin: 'auto', boxShadow: 3, marginRight: '0px', height: "400px" }}>
//       {/* <CardMedia
//         component="img"
//         height="140"
//         image="https://pro-theme.com/html/teamhost/assets/img/heading3.jpg"
//         alt="Profile Background"
//       /> */}
//       <Avatar
//         // alt={sampleData.name}
//         src={user?.profileImage || defaultProfileImage}
//         sx={{ width: 100, height: 100, margin: 'auto', marginTop: '48px', border: '3px solid white' }}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div" align="center" marginBottom='0px'>
//           {user?.username}
//         </Typography>
//         <Typography gutterBottom variant="h6" component="div" align="center" marginBottom='20px'>
//           {user?.displayName}
//         </Typography>
//         <Box display="flex" justifyContent="space-around" alignItems="center">
//           <Box textAlign="center">
//             <Typography variant="h6">{sampleData.followers}</Typography>
//             <Typography variant="body2" color="textSecondary">Followers</Typography>
//           </Box>
//           <Box textAlign="center">
//             <Typography variant="h6">{sampleData.following}</Typography>
//             <Typography variant="body2" color="textSecondary">Following</Typography>
//           </Box>
//           <Box textAlign="center">
//             <Typography variant="h6">{sampleData.posts}</Typography>
//             <Typography variant="body2" color="textSecondary">Posts</Typography>
//           </Box>
//         </Box>
//       </CardContent>
//       {ownProfile ? (
//         <>
//           <Box textAlign="center" pb={2}>
//             <Button variant="contained" color="primary" onClick={() => { setIsModalOpen(true) }}>Create Post</Button>
//           </Box>
//           <ImageUploadModal
//             isOpen={isModalOpen}
//             profile={false}
//             onClose={() => setIsModalOpen(false)}
//             onSubmit={handleImageUpload}
//             isPost={true} // Creating a post
//           />

//         </>
//       ) : (
//         <>
//           <Box textAlign="center" pb={2}>
//             <Button variant="contained" color="primary">Follow</Button>
//           </Box>
//         </>
//       )
//       }

//     </Card>
//   );
// };

// export default UserProfileCard;




import React, { useState } from "react";
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

interface UserTitleCardProps {
  user: UserData | GoogleUser | UserDetails | null;
}
interface OwnProfileProps {
  ownProfile: boolean;
}

interface CombinedProps extends UserTitleCardProps, OwnProfileProps {}

const UserProfileCard: React.FC<CombinedProps> = ({ user, ownProfile }) => {
  const defaultProfileImage =
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1719396828~exp=1719400428~hmac=3992078a184c24bf98ee7b06afbab8f3bad2a1d00f616f2b7a906e219f974cb1&w=740";

  const sampleData = {
    profileImage:
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1719396828~exp=1719400428~hmac=3992078a184c24bf98ee7b06afbab8f3bad2a1d00f616f2b7a906e219f974cb1&w=740",
    followers: 1200,
    following: 300,
    posts: 45,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>({
    shape: "rect",
    aspect: [700 / 400, 1020 / 400],
  });

  const handlePostCreation = async (croppedImage: string, _isProfileImage?: boolean, description?: string) => {
    try {
      const base64String = croppedImage.split(",")[1];
      const API_URL = import.meta.env.VITE_USER_API_URL;
        console.log('base64String',base64String)
        const username = user?.username
        const result = await axiosInstance.post(`${API_URL}create-post`, {username, croppedImage: base64String, description})
        console.log('result',result)
        if(result.status === 200){
          toast.success("Post added successfully")
        }
    } catch (error: any) {
      toast.error(error.message)
    }
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
        src={user?.profileImage || defaultProfileImage}
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
            <Typography variant="h6">{sampleData.followers}</Typography>
            <Typography variant="body2" color="textSecondary">
              Followers
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6">{sampleData.following}</Typography>
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
        {ownProfile && (
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
        )}
      </CardContent>
      <ImageUploadModal
        isOpen={isModalOpen}
        profile={false}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePostCreation}
        isPost={true}
        // aspectRatio={aspectRatio}
      />
    </Card>
  );
};

export default UserProfileCard;
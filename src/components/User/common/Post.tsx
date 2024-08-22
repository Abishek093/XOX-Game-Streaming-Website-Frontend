import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box, Avatar } from '@mui/material';
import { GoogleUser, UserData, UserDetails } from '../../../interfaces/userInterfaces/apiInterfaces';
import { SlGameController } from 'react-icons/sl';
import { GoCommentDiscussion } from 'react-icons/go';
import axiosInstance from '../../../services/userServices/axiosInstance';
import CommentBox from './CommentBox';
import { useAppSelector } from '../../../store/hooks';
import { selectUser } from '../../../Slices/userSlice/userSlice';
import { BsThreeDotsVertical } from 'react-icons/bs';
import PostOptionModal from './PostOptionModal';
import { toast } from 'sonner';

const styles = {
  largeIcon: {
    width: 25,
    height: 25,
  },
  buttonStyle: {
    color: 'red',
    marginRight: -2,
  },
};

interface PostProps {
  user: UserData | GoogleUser | UserDetails | null;
  post: {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    likeCount: number;
  };
}

const Post: React.FC<PostProps> = ({ post, user }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [optionMenu, setOptionMenu] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [reportModal, setReportModal] = useState(false)
  const ownUser = useAppSelector(selectUser);
  const userId = ownUser?.id;

  const API_URL = import.meta.env.VITE_USER_API_URL;
  // console.log('.......post',post)
  useEffect(() => {
    const checkLikeStatus = async () => {
      const PostId = post._id;
      const UserId = ownUser?.id;
      try {
        const response = await axiosInstance.post(`${API_URL}check-like`, { postId: PostId, userId: UserId });
        setIsLiked(response.data.liked);
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };

    checkLikeStatus();
  }, [post._id, ownUser?.id, API_URL]);

  const handleLikeClick = async () => {
    try {
      const action = isLiked ? 'unlike' : 'like';
      await axiosInstance.post(`${API_URL}${action}-post`, {
        userId: ownUser?.id,
        postId: post._id,
      });
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(`Error ${isLiked ? 'unliking' : 'liking'} the post`, error);
    }
  };

  const handleUpdatPost = async(description: string, croppedImage: string|null) =>{
    const postId = post._id
    const response = await axiosInstance.post(`update-post`,{postId, description, croppedImage})
    console.log(response)
  }


  const handleReportSubmit = async (reason: string) =>{
    try {
      const postId = post._id
      const userId = ownUser?.id;
      const response = await axiosInstance.post(`report-post`,{userId, postId, reason})
        setReportModal(false)
        setOptionMenu(false)
        toast.success('Report addes successfully')
    } catch (error:any) {
      toast.error(error.message)
    }
  }

  return (
    <Card sx={{ maxWidth: 'full', maxHeight: 'auto', margin: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar aria-label="user-avatar" src={user?.profileImage} />
          <Box sx={{ marginLeft: 2 }}>
            <Typography variant="subtitle1">{user?.displayName}</Typography>
            <Typography variant="body2" color="textSecondary">{new Date(post.createdAt).toLocaleDateString()}</Typography>
          </Box>
        </Box>
        <BsThreeDotsVertical onClick={() => { setOptionMenu(true) }} />
      </Box>
      <CardMedia
        component="img"
        sx={{ height: 400, width: 'auto', margin: '0 auto' }}
        image={post.content}
        title={post.title}
      />
      <CardContent>
        <Typography variant="body2" color="black" component="p">
          {post.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            aria-label="like"
            startIcon={<SlGameController style={styles.largeIcon} />}
            sx={{ color: isLiked ? 'red' : '', marginRight: -2 }}
            onClick={handleLikeClick}
          />
          <Typography variant="body2" color="textSecondary" sx={{ marginRight: 2 }}>
            {post.likeCount} {post.likeCount === 1 ? 'like' : 'likes'}
          </Typography>
        </Box>
        <Button
          onClick={() => setIsOpen(true)}
          aria-label="comment"
          startIcon={<GoCommentDiscussion style={styles.largeIcon} />}
        />
      </CardActions>
      {isOpen && userId && (
        <CommentBox
          postId={post._id}
          userId={userId}
          onClose={() => setIsOpen(false)}
        />
      )}
      {
        optionMenu && (
          <PostOptionModal
            user = {user}
            postId = {post._id}
            onClose={() => { setOptionMenu(false) }}
            updatePost = {handleUpdatPost}
            reportPost = {handleReportSubmit}
            editModal = {editModal}
            setEditModal = {setEditModal}
            reportModal = {reportModal}
            setReportModal = {setReportModal}
          />
        )
      }
    </Card>
  );
};

export default Post;

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../services/userServices/axiosInstance';
import Post from './Post';
import { GoogleUser, UserData, UserDetails } from '../../../interfaces/userInterfaces/apiInterfaces';

interface PostFeedProps {
  user: UserData | GoogleUser | UserDetails | null;
}

const PostFeed: React.FC<PostFeedProps> = ({ user }) => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    console.log(user, "User in post feed");

    const fetchPosts = async (userId: string) => {
      console.log("Fetching posts for userId:", userId);
      try {
        const response = await axiosInstance.get(`/fetch-posts/${userId}`);
        console.log("Response from fetch-posts:", response);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (user && user.id) {
      fetchPosts(user.id);
    }

  }, [user]);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} user={user} post={post} />
      ))}
    </div>
  );
};

export default PostFeed;

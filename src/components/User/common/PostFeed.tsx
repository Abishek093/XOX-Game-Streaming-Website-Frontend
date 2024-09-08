// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../../services/userServices/axiosInstance";
// import Post from "./Post";
// import {
//   GoogleUser,
//   UserData,
//   UserDetails,
// } from "../../../interfaces/userInterfaces/apiInterfaces";

// interface PostFeedProps {
//   user: UserData | GoogleUser | UserDetails | null;
//   setPosts: React.Dispatch<React.SetStateAction<any[]>>;
//   posts:any[]
//   removePost: (postId: string) => void;
// }

// const PostFeed: React.FC<PostFeedProps> = ({ user, posts, setPosts, removePost }) => {
//   // const [posts, setPosts] = useState<any[]>([]);

//   useEffect(() => {
//     console.log(user, "User in post feed");

//     const fetchPosts = async (userId: string) => {
//       console.log("Fetching posts for userId:", userId);
//       try {
//         const response = await axiosInstance.get(`/fetch-posts/${userId}`);
//         console.log("Response from fetch-posts:", response);
//         setPosts(response.data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     if (user && user.id) {
//       fetchPosts(user.id);
//     }
//   }, [user]);

//   return (
//     <div>
//       {posts.length > 0 ? ( 
//         <div>
//           {posts.map((post) => (
//             <Post key={post._id} user={user} post={post} removePost={removePost} />
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center h-[53vh] bg-white">
//           <img
//             src="/src/assets/NoImages.png"
//             alt="No content available"
//             className="h-20"
//           />
//           <p className="mt-4 text-gray-600 text-md font-sans font-semibold">
//             No posts yet!
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostFeed;
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import axiosInstance from '../../../services/userServices/axiosInstance';
import Post from './Post';
import { GoogleUser, UserData, UserDetails } from '../../../interfaces/userInterfaces/apiInterfaces';

interface PostFeedProps {
  user: UserData | GoogleUser | UserDetails | null;
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
  posts:any[];
  removePost: (postId: string) => void;
}

const PostFeed: React.FC<PostFeedProps> = ({ user, posts, setPosts, removePost }) => {

  useEffect(() => {
    const socket = io('http://localhost:5000'); 

    socket.on('post-liked', (data) => {
      const updatedPosts = posts.map(post => 
        post._id === data.postId ? { ...post, likeCount: post.likeCount + 1 } : post
      );
      setPosts(updatedPosts);
    });

        socket.on('post-unliked', (data) => {
      const updatedPosts = posts.map(post => 
        post._id === data.postId ? { ...post, likeCount: post.likeCount - 1 } : post
      );
      setPosts(updatedPosts);
    });

    return () => {
      socket.disconnect();
    };
  }, [posts, setPosts]);

  useEffect(() => {
    const fetchPosts = async (userId: string) => {
      try {
        const response = await axiosInstance.get(`/fetch-posts/${userId}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (user && user.id) {
      fetchPosts(user.id);
    }
  }, [user, setPosts]);

  return (
    <div>
      {posts.length > 0 ? ( 
        <div>
          {posts.map((post) => (
            <Post key={post._id} user={user} post={post} removePost={removePost} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[53vh] bg-white">
          <img
            src="/src/assets/NoImages.png"
            alt="No content available"
            className="h-20"
          />
          <p className="mt-4 text-gray-600 text-md font-sans font-semibold">
            No posts yet!
          </p>
        </div>
      )}
    </div>
  );
};

export default PostFeed;

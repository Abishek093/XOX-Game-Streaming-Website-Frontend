import React, { useEffect, useState } from "react";
import axiosInstance from "../../../services/userServices/axiosInstance";
import Post from "./Post";
import {
  GoogleUser,
  UserData,
  UserDetails,
} from "../../../interfaces/userInterfaces/apiInterfaces";

interface PostFeedProps {
  user: UserData | GoogleUser | UserDetails | null;
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
  posts:any[]
}

const PostFeed: React.FC<PostFeedProps> = ({ user, posts, setPosts }) => {
  // const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    console.log(user, "User in post feed");

    const fetchPosts = async (userId: string) => {
      console.log("Fetching posts for userId:", userId);
      try {
        const response = await axiosInstance.get(`/fetch-posts/${userId}`);
        console.log("Response from fetch-posts:", response);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (user && user.id) {
      fetchPosts(user.id);
    }
  }, [user, posts]);

  return (
    <div>
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <Post key={post._id} user={user} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[53vh] bg-white">
          <img
            src="/src/assets/NoImages.png"
            alt="No content available"
            className="h-48"
          />
          <p className="mt-4 text-gray-600 text-lg font-mono font-bold">
            No posts yet!
          </p>
        </div>
      )}
    </div>
  );
};

export default PostFeed;

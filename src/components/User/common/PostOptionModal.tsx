import React, { useEffect, useState } from 'react';
import { GoReport } from "react-icons/go";
import DescriptionModal from '../../Common/DescriptionModal';
import { GoogleUser, UserData, UserDetails } from '../../../interfaces/userInterfaces/apiInterfaces';
import { useAppSelector } from '../../../store/hooks';
import { selectUser } from '../../../Slices/userSlice/userSlice';
import axiosInstance from '../../../services/userServices/axiosInstance';
import ReportModal from '../../Common/ReportModal';

interface PostOptionModalProps {
  user: UserData | GoogleUser | UserDetails | null;
  postId: string
  onClose: () => void;
  updatePost : (description: string, croppedImage: string|null) => void
  reportPost : (reason: string) => void
}


const PostOptionModal: React.FC<PostOptionModalProps> = ({ user, postId, onClose, updatePost, reportPost }) => {
  const [editModal, setEditModal] = useState(false)
  const [post, setPost] = useState<any>(null);
  const [reportModal, setReportModal] = useState(false)
  const ownUser = useAppSelector(selectUser)


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`fetch-post/${postId}`);
        console.log(response)
        setPost(response.data)
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div
        className="relative w-80 bg-white rounded-lg flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="flex flex-col w-full">
          {
            ownUser?.id === user?.id && (
              <>
                <li className="flex justify-center items-center p-4 cursor-pointer hover:bg-gray-100" onClick={() => { setEditModal(true) }}>
                  Edit Post
                </li>
              </>
            )
          }
          <li className="flex justify-center items-center p-4 cursor-pointer hover:bg-gray-100 text-red-600" onClick={()=>{setReportModal(true)}}>
            <GoReport className='mr-2' />
            Report Post
          </li>
        </ul>
      </div>
      {
        editModal && (
          <DescriptionModal
            descriptionProps={post.title}
            isOpen={editModal}
            croppedImage={post.content}
            onClose={() => setEditModal(false)}
            onSubmit={updatePost}
          />
        )
      }
      {
        reportModal&&(
          <ReportModal 
          isOpen={reportModal}
          onClose={()=>setReportModal(false)}
          onSubmit={reportPost}
          />
        )
      }
    </div>
  );
};

export default PostOptionModal;

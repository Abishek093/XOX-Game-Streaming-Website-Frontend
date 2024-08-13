import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useAppSelector } from '../../../store/hooks';
import { selectUser } from '../../../Slices/userSlice/userSlice';

interface CommentSectionProps {
  comments: any[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  const ownUser = useAppSelector(selectUser);
  const [commentOptionModal, setCommentOptionModal] = useState(false)

  return (
    <div className="flex-grow overflow-auto p-4">
      {comments.map((comment) => (
        <div key={comment._id} className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={comment.userDetails?.profileImage || 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-2 max-w-full">
                <div className="font-semibold">{comment.userDetails?.displayName || 'Unknown User'}</div>
                <div className="text-gray-600 break-words">
                  {comment.content}
                </div>
              </div>
            </div>
            {/* {comment.author === ownUser?.id && (
              <div className="ml-auto">
                <BsThreeDotsVertical 
                  // onClick={}
                />
              </div>
            )} */}
          </div>
          <div className="border-b border-gray-300 mt-3"></div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;

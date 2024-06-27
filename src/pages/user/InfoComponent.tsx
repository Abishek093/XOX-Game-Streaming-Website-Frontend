import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../Slices/userSlice/userSlice';
import {FaDiceThree} from 'react-icons/fa'
const InfoComponent: React.FC = () => {
  const user = useAppSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false);

  const [username, setUsername] = useState(user?.user?.username || '');
  const [displayName, setDisplayName] = useState(user?.user?.displayName || '');
  const [age, setAge] = useState(user?.user?.age || '');
  const [bio, setBio] = useState(user?.user?.bio || '');
  const [dob, setDob] = useState(user?.user?.dob || '');

  useEffect(() => {
    setUsername(user?.user?.username || '');
    setDisplayName(user?.user?.displayName || '');
    setAge(user?.user?.age || '');
    setBio(user?.user?.bio || '');
    setDob(user?.user?.dob || '');
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'displayName') setDisplayName(value);
    if (name === 'age') setAge(value);
    if (name === 'bio') setBio(value);
    if (name === 'dob') setDob(value);
  };

  const renderWarningIcon = (value: string) => {
    return (
      !value && (
        <FaDiceThree className="h-5 w-5 text-red-500 inline ml-1" />
      )
    );
  };

  return (
    <div className="h-full bg-white p-4 flex justify-center items-center">
      <div className="space-y-4 w-full max-w-md">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Username
            {renderWarningIcon(username)}
          </label>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              type="text"
              value={username}
              name="username"
              id="username"
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6 ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Display Name
            {renderWarningIcon(displayName)}
          </label>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              type="text"
              value={displayName}
              name="displayName"
              id="displayName"
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6 ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Age
            {renderWarningIcon(age)}
          </label>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              type="text"
              value={age}
              name="age"
              id="age"
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6 ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Bio
            {renderWarningIcon(bio)}
          </label>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <textarea
              value={bio}
              name="bio"
              id="bio"
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6 ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Date of Birth
            {renderWarningIcon(dob)}
          </label>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              type="date"
              value={dob}
              name="dob"
              id="dob"
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6 ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
            />
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 w-full"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default InfoComponent;

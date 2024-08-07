import React, { useCallback, useState } from 'react';
import SearchBar from '../../components/User/Friends/SearchBar';
import FriendRequest from '../../components/User/Friends/FriendRequest';
import SearchResult from '../../components/User/Friends/SearchResult';
import debounce from 'lodash.debounce';
import axiosInstance from '../../services/userServices/axiosInstance';

interface User {
  id: string,
  username: string,
  displayName: string,
  profileImage: string
}

const Friends: React.FC = () => {   
  const API_URL = import.meta.env.VITE_USER_API_URL;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);  

  const fetchSearchResults = async (query: string) => {
    if (query.trim() !== '') {
      try {
        const response = await axiosInstance.get(`${API_URL}searchUsers?query=${query}`);
        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const debouncedSearchResult = useCallback(debounce(fetchSearchResults, 300), []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    debouncedSearchResult(query);
  };

  return (
    <div className="p-12">
      <div className="grid grid-cols-3 gap-4">
        <p>Search Friends</p>
        <p className="col-start-3 px-4">Friend Requests</p>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-4">
        <div className="col-span-2">
          <SearchBar onSearchChange={handleSearchChange}/>
          <div className="h-auto mt-4 rounded-md">
            <SearchResult results={searchResults} />
          </div>
        </div>
        <div className="col-start-3">
          <FriendRequest />
        </div>
      </div>
    </div>
  );
};

export default Friends;

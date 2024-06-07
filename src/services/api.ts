import axios from 'axios';
import { UserData } from '../store/userSlice';

const API_URL = 'http://localhost:5000/api'; 

export const signup = async (userDetails: UserData): Promise<UserData> => {
  try {
    console.log(userDetails);
    const response = await axios.post<UserData>(`${API_URL}/signup`, userDetails);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to sign up');
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error(error.message || 'Failed to sign up');
    }
  }
};

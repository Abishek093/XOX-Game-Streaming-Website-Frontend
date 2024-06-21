import axios from 'axios';
import { UserData, VerifyOtpPayload, VerifyOtpResponse, LoginPayload,LoginResponse,GoogleUser,AuthenticatedUser, RefreshTokenResponse } from '../../interfaces/userInterfaces/apiInterfaces';
import axiosInstance from './axiosInstance';


const API_URL = 'http://localhost:5000/api/';

export const signup = async (userDetails: UserData): Promise<UserData> => {
  try {
    const response = await axios.post<UserData>(`${API_URL}signup`, userDetails);
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

// export const googleSignup = async(userDetails)

export const verifyOtpApi = async (otpDetails: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
  try {
    const response = await axios.post<VerifyOtpResponse>(`${API_URL}verify-otp`, otpDetails);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to verify OTP' };
  }
};

export const login = async (loginDetails: LoginPayload): Promise<LoginResponse> => {
  try {
    console.log("Service",loginDetails);
    const response = await axios.post<LoginResponse>(`${API_URL}login`, loginDetails);
    console.log("Service response",response.data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to login' };
  }
};


export const googleSignupService = async (googleSignupDetails: GoogleUser): Promise<AuthenticatedUser> => {
  try {
    const response = await axios.post<AuthenticatedUser>(`${API_URL}googleSignup`, googleSignupDetails);
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


export const googleLoginService = async (googleLoginDetails: GoogleUser): Promise<AuthenticatedUser> => {
  try {
    const response = await axios.post<AuthenticatedUser>(`${API_URL}googleLogin`, googleLoginDetails);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to login');
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error(error.message || 'Failed to login');
    }
  }
};


export const refreshAccessToken = async(refreshToken: string):Promise<RefreshTokenResponse>=>{
  const response = await axiosInstance.post<RefreshTokenResponse>(`${API_URL}refresh-token`, { refreshToken });
  return response.data;
}



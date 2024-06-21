export interface VerifyOtpPayload {
    otp: string;
    email: string;
  }
  
  export interface VerifyOtpResponse {
    success: boolean;
    message: string;
  }
  
  export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: UserData; 
  }

  export interface UserData {
    userName: string;
    displayName: string;
    email: string;
    password: string;
    birthDate: string;
  }
  
  export interface GoogleUser {
    userId: string;
    userName: string;
    email: string;
    profileImage: string;
    displayName?: string; 
    password?: string; 
    birthDate?: string; 
  }

  export interface AuthenticatedUser {
    accessToken: string;
    refreshToken: string;
    user: GoogleUser;
    token: string;
  }

  export interface GoogleLoginPayload {
    userId: string;  
    email: string;
    userName: string;
    profileImage: string;
  }
  

  export interface RefreshTokenResponse{
    accessToken: string;
    refreshToken: string;
  }
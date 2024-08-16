export interface UserData {
  id?: string;
  username: string;
  displayName: string;
  email: string;
  password: string;
  birthDate?: string;
  profileImage?: string;
  titleImage?: string;
  bio?:string
}

export interface GoogleUser {
  id?: string;
  username: string;
  email: string;
  profileImage: string;
  displayName?: string; 
  password?: string; 
  birthDate?: string; 
  titleImage?: string;
  bio?:string

}

export interface UserDetails {
  id: string;
  username: string;
  profileImage: string;
  titleImage?:string;
  displayName?: string; 
  password?: string; 
  bio?: string
}


export interface ImageUploadValues {
  username?: string;
  userId: string;
  profileImage: string;
  titleImage: string
}


export interface VerifyOtpPayload {
    otp: string;
    email: string;
  }
  
  export interface VerifyOtpResponse {
    success: boolean;
    message: string;
  }
  
  export interface verifyResetOtpResponse {
    success: boolean;
    message: string;
    email: string
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


  export interface UserApiData {
    username: string;
    displayName: string;
    email: string;
    password: string;
    birthDate: string;
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
    username: string;
    profileImage: string;
  }
  

  export interface RefreshTokenResponse{
    accessToken: string;
    refreshToken: string;
  }

  export interface UpdateUser {
    userId: string;
    username: string;
    displayName: string;
    bio: string;
  }

  export interface UpdateUserResponse {
    user: NonSensitiveUserProps;
  }

  export interface NonSensitiveUserProps {
    userId: string;
    email: string;
    username: string;
    displayName?: string;
    profileImage: string;
    titleImage?: string;
    bio?: string;
    followers: string[];
    following: string[];
    dateOfBirth: Date;
  }

  export interface ConfirmMailRequest {
    email: string;
  }
  
  export interface ConfirmMailResponse {
    success: boolean;
    message: string;
    email: string;
  }

  export interface UpdatePasswordRequest {
    newPassword: string
    email: string
  }
  
  export interface UpdatePasswordResponse {
    success: boolean;
    message: string;
  }



  export interface ImageUploadResponse {
    userId: string;
    profileImageUrl: string;
    titleImageUrl: string
  }

  export interface AspectRatio {
    shape: "round" | "rect";
    aspect: number[];
  }

  export interface ICommunityWithCounts {
    _id: string;
    name: string;
    postCount: number;
    followerCount: number;
    image: string
  }
  
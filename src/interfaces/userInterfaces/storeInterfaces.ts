// import { UserData, GoogleUser } from './userInterfaces/apiInterfaces';
import { UserData, GoogleUser} from "./apiInterfaces";
export interface UserState {
  user: UserData | GoogleUser | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  otpStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  otpError: string | null;
  email: string | null;
}

// export interface GoogleUser{
//   userId: string,
//   userName: string,
//   email: string,
//   profileImage: string
// }
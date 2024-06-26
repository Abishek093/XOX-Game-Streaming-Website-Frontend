import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signup, verifyOtpApi, login, googleSignupService,googleLoginService } from '../../services/userServices/api';
import { LoginPayload, UserData, VerifyOtpPayload, VerifyOtpResponse, LoginResponse, GoogleUser, AuthenticatedUser } from '../../interfaces/userInterfaces/apiInterfaces';
import { UserState } from '../../interfaces/userInterfaces/storeInterfaces';
import Cookies from 'js-cookie';

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
  otpStatus: 'idle',
  otpError: null,
};

export const signupUser = createAsyncThunk<UserData, UserData>(
  'user/signupUser',
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await signup(userDetails);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyOtp = createAsyncThunk<VerifyOtpResponse, VerifyOtpPayload>(
  'user/verifyOtp',
  async (otpDetails, { rejectWithValue }) => {
    try {
      const response = await verifyOtpApi(otpDetails);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk<LoginResponse, LoginPayload>(
  'user/loginUser',
  async (loginDetails, { rejectWithValue }) => {
    try {
      const response = await login(loginDetails);
      // localStorage.setItem('token', response.token);
      Cookies.set('refreshToken', response.refreshToken,{
        sameSite: 'strict',
        expires: 1/96
      });

      Cookies.set('accessToken', response.accessToken,{
        sameSite: 'strict',
        expires: 7
      });

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const googleSignup = createAsyncThunk<AuthenticatedUser, GoogleUser>(
  'user/googleSignup',
  async (googleSignupDetails, { rejectWithValue }) => {
    try {
      const response = await googleSignupService(googleSignupDetails);
      // localStorage.setItem('token', response.token); 
      Cookies.set('refreshToken', response.refreshToken,{
        sameSite: 'strict',
        expires: 1/96
      });

      Cookies.set('accessToken', response.accessToken,{
        sameSite: 'strict',
        expires: 7
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const googleLogin = createAsyncThunk<AuthenticatedUser, GoogleUser>(
  'user/googleLogin',
  async (googleLoginDetails, { rejectWithValue }) => {
    try {
      const response = await googleLoginService(googleLoginDetails);
      // localStorage.setItem('token', response.token);
      Cookies.set('refreshToken', response.refreshToken,{
        sameSite: 'strict',
        expires: 1/96
      });

      Cookies.set('accessToken', response.accessToken,{
        sameSite: 'strict',
        expires: 7
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearUser = createAsyncThunk<void, void>(
  'user/clearUser',
  async (_, { dispatch }) => {
    dispatch(logout());
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');  }
);



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      state.otpStatus = 'idle';
      state.otpError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.status = 'idle';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Signup failed';
      })
      // Handle OTP verification actions
      .addCase(verifyOtp.pending, (state) => {
        state.otpStatus = 'loading';
        state.otpError = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.otpStatus = 'succeeded';
        state.otpError = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.otpStatus = 'failed';
        state.otpError = action.payload as string || 'Failed to verify OTP';
      })
      // Handle Login actions
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Login failed';
      })
      // Handle Google signup actions
      .addCase(googleSignup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(googleSignup.fulfilled, (state, action: PayloadAction<AuthenticatedUser>) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(googleSignup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Google signup failed';
      })

      .addCase(googleLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action: PayloadAction<AuthenticatedUser>) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Google login failed';
      });

  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user;
export const selectStatus = (state: { user: UserState }) => state.user.status;
export const selectError = (state: { user: UserState }) => state.user.error;
export const selectOtpStatus = (state: { user: UserState }) => state.user.otpStatus;
export const selectOtpError = (state: { user: UserState }) => state.user.otpError;

export default userSlice.reducer;

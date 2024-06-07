import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signup } from '../services/api';

export interface UserData {
  userName: string;
  displayName: string;
  email: string;
  password: string;
  birthDate: string;
}

export interface UserState {
  user: UserData | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
      });
  },
});

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectStatus = (state: { user: UserState }) => state.user.status;
export const selectError = (state: { user: UserState }) => state.user.error;

export default userSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AdminLoginPayload, AdminLoginResponse } from '../../interfaces/adminInterfaces/adminInterface';
import { adminLogin } from '../../services/adminServices/adminService';
import { AdminState } from '../../interfaces/adminInterfaces/adminStoreInterface'
import Cookies from 'js-cookie';

const initialState: AdminState = {
  admin: null,
  status: 'idle',
  error: null,
  otpStatus: 'idle',
  otpError: null,
};


export const loginAdmin = createAsyncThunk<AdminLoginResponse, AdminLoginPayload>(
  'admin/loginUser',
  async (loginDetails, { rejectWithValue }) => {
    console.log("admin slice", loginDetails);

    try {
      const response = await adminLogin(loginDetails);
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

export const clearAdmin = createAsyncThunk<void, void>(
  'user/clearUser',
  async (_, { dispatch }) => {
    dispatch(logout());
    localStorage.removeItem('token');
  }
);


export const adminSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.admin = null;
      state.status = 'idle';
      state.error = null;
      state.otpStatus = 'idle';
      state.otpError = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginAdmin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<AdminLoginResponse>) => {
        state.status = 'idle';
        state.admin = action.payload.admin;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Login failed';
      })

  }
})

export const { logout } = adminSlice.actions;

export const selectAdmin = (state: { admin: AdminState }) => state.admin;
export const selectStatus = (state: { admin: AdminState }) => state.admin.status;
export const selectError = (state: { admin: AdminState }) => state.admin.error;

export default adminSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, FetchStatus, NameSpace } from '../../const';
import { StoredUser } from '../../types/api/login';
import { checkAuthStatus, login, logout } from './api-actions';

type InitialState = {
  userLoadingStatus: FetchStatus;
  authStatus: AuthorizationStatus;
  user: StoredUser | null;
}

const initialState: InitialState = {
  userLoadingStatus: FetchStatus.Idle,
  authStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.userLoadingStatus = FetchStatus.Success;
        state.authStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthStatus.pending, (state) => {
        state.userLoadingStatus = FetchStatus.Pending;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.userLoadingStatus = FetchStatus.Failed;
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userLoadingStatus = FetchStatus.Success;
        state.authStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.userLoadingStatus = FetchStatus.Pending;
      })
      .addCase(login.rejected, (state) => {
        state.userLoadingStatus = FetchStatus.Failed;
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.userLoadingStatus = FetchStatus.Success;
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.pending, (state) => {
        state.userLoadingStatus = FetchStatus.Pending;
      })
      .addCase(logout.rejected, (state) => {
        state.userLoadingStatus = FetchStatus.Failed;
        state.authStatus = AuthorizationStatus.Auth;
      });
  }
});

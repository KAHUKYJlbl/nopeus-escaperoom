import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';

import { AuthData, StoredUser, User } from '../../types/api/login';
import { AppDispatch, State } from '../../types/state/state';
import { APIRoute } from '../../const';
import { toast } from 'react-toastify';
import { dropToken, setToken } from '../../services/token';

export const checkAuthStatus = createAsyncThunk<StoredUser, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuthStatus',
  async (_arg, {dispatch, extra: axios}) => {
    try {
      const {data: {token, ...rest}} = await axios.get<User>(APIRoute.Login);
      // dispatch(fetchFavorites());
      return rest;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status !== 401) {
        toast.error('Login check failed.');
      }
      throw err;
    }
  },
);

export const login = createAsyncThunk<StoredUser, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: axios}) => {
    try {
      const {data: {token, ...rest}} = await axios.post<User>(APIRoute.Login, {email, password});
      setToken(token);
      // dispatch(fetchFavorites());
      return rest;
    } catch (err) {
      toast.error('Login failed. Please try again.');
      throw err;
    }
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: axios}) => {
    try {
      await axios.delete(APIRoute.Logout);
      dropToken();
    } catch (err) {
      toast.error('Logout failed. Please try again.');
      throw err;
    }
  },
);

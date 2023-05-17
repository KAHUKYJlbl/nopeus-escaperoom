import { createAsyncThunk } from '@reduxjs/toolkit';
import { generatePath } from 'react-router-dom';
import { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { MyQuestInfo } from '../../types/my-quests/my-quests';
import { AppDispatch, State } from '../../types/state/state';
import { redirectToRoute } from '../actions/app-actions';
import { APIRoute, AppRoute } from '../../const';

export const fetchMyQuests = createAsyncThunk<MyQuestInfo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'MyQuests/fetchMyQuests',
  async (_arg, {extra: axios}) => {
    try {
      const {data} = await axios.get<MyQuestInfo[]>(APIRoute.MyQuests);
      return data;
    } catch (err) {
      toast.error('My quests loading failed. Please try again.');
      throw err;
    }
  },
);

export const DeleteMyQuest = createAsyncThunk<void, string , {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Booking/DeleteMyQuest',
  async (id = '0', {dispatch, extra: axios}) => {
    try {
      await axios.delete<void>(generatePath(APIRoute.Canceling, {reservationId: id}));
      dispatch(fetchMyQuests());
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        dispatch(redirectToRoute(AppRoute.Login));
        toast.error('Could not cancel booking. Please log in');
      }

      throw error;
    }
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingInfo } from '../../types/booking/boking';
import { AppDispatch, State } from '../../types/state/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { toast } from 'react-toastify';

export const fetchMyQuests = createAsyncThunk<BookingInfo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Booking/fetchMyQuests',
  async (_arg, {dispatch, extra: axios}) => {
    try {
      const {data} = await axios.get<BookingInfo[]>(APIRoute.MyQuests);
      // dispatch(fetchFavorites());
      return data;
    } catch (err) {
      toast.error('My quests loading failed. Please try again.');
      throw err;
    }
  },
);

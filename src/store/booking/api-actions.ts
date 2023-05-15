import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { BookingInfo } from '../../types/booking/booking';
import { AppDispatch, State } from '../../types/state/state';
import { APIRoute } from '../../const';
import { toast } from 'react-toastify';
import { generatePath } from 'react-router-dom';

export const fetchBookingSlots = createAsyncThunk<BookingInfo[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Booking/fetchBookingSlots',
  async (id = '0', {dispatch, extra: axios}) => {
    try {
      const {data} = await axios.get<BookingInfo[]>(generatePath(APIRoute.Booking, {id}));
      // dispatch(fetchFavorites());
      return data;
    } catch (err) {
      toast.error('Booking sluts loading failed. Please try again.');
      throw err;
    }
  },
);

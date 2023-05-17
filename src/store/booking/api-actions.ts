import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';

import { BookingData, BookingInfo } from '../../types/booking/booking';
import { AppDispatch, State } from '../../types/state/state';
import { APIRoute, AppRoute } from '../../const';
import { toast } from 'react-toastify';
import { generatePath } from 'react-router-dom';
import { redirectToRoute } from '../actions/app-actions';

export const fetchBookingSlots = createAsyncThunk<BookingInfo[], string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Booking/fetchBookingSlots',
  async (id = '0', {dispatch, extra: axios}) => {
    try {
      const {data} = await axios.get<BookingInfo[]>(generatePath(APIRoute.Booking, {id}));
      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        dispatch(redirectToRoute(AppRoute.Login));
        toast.error('Could not load booking sluts. Please log in.');
      }

      throw error;
    }
  },
);

export const BookSlot = createAsyncThunk<void, BookingData & Pick<BookingInfo, 'id'> , {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Booking/BookSlot',
  async ({id, ...bookingData}, {dispatch, extra: axios}) => {
    try {
      await axios.post<void>(generatePath(APIRoute.Booking, {id}), bookingData);
      dispatch(redirectToRoute(AppRoute.MyQuests));
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        toast.error('Quest not booked. Please refill the form and try again');
      }

      if (error instanceof AxiosError && error.response?.status === 401) {
        dispatch(redirectToRoute(AppRoute.Login));
        toast.error('Could not book slot. Please log in');
      }

      throw error;
    }
  },
);

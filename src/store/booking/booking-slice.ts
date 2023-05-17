import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FetchStatus, NameSpace } from '../../const';
import { BookingInfo } from '../../types/booking/booking';
import { BookSlot, fetchBookingSlots } from './api-actions';

type InitialState = {
  bookingSlotsLoadingStatus: FetchStatus;
  bookingPostingStatus: FetchStatus;
  currentBookingId: string | null;
  bookingSlots: BookingInfo[];
}

const initialState: InitialState = {
  bookingSlotsLoadingStatus: FetchStatus.Idle,
  bookingPostingStatus: FetchStatus.Idle,
  currentBookingId: null,
  bookingSlots: [],
};

export const bookingSlice = createSlice({
  name: NameSpace.Booking,
  initialState,
  reducers: {
    changeCurrentBookingId: (state, action: PayloadAction<string>) => {
      state.currentBookingId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBookingSlots.fulfilled, (state, action) => {
        state.bookingSlotsLoadingStatus = FetchStatus.Success;
        state.bookingSlots = action.payload;
        state.currentBookingId = action.payload[0].id;
      })
      .addCase(fetchBookingSlots.pending, (state) => {
        state.bookingSlotsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchBookingSlots.rejected, (state) => {
        state.bookingSlotsLoadingStatus = FetchStatus.Failed;
      })
      .addCase(BookSlot.fulfilled, (state) => {
        state.bookingPostingStatus = FetchStatus.Success;
      })
      .addCase(BookSlot.pending, (state) => {
        state.bookingPostingStatus = FetchStatus.Pending;
      })
      .addCase(BookSlot.rejected, (state) => {
        state.bookingPostingStatus = FetchStatus.Failed;
      });
  }
});

export const {changeCurrentBookingId} = bookingSlice.actions;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FetchStatus, NameSpace } from '../../const';
import { BookingInfo } from '../../types/booking/booking';
import { fetchBookingSlots } from './api-actions';

type InitialState = {
  bookingSlotsLoadingStatus: FetchStatus,
  currentBookingId: string | null,
  bookingSlots: BookingInfo[],
}

const initialState: InitialState = {
  bookingSlotsLoadingStatus: FetchStatus.Idle,
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
      // .addCase(fetchQuestById.fulfilled, (state, action) => {
      //   state.questLoadingStatus = FetchStatus.Success;
      //   state.quest = action.payload;
      // })
      // .addCase(fetchQuestById.pending, (state) => {
      //   state.quest = null;
      //   state.questLoadingStatus = FetchStatus.Pending;
      // })
      // .addCase(fetchQuestById.rejected, (state) => {
      //   state.questLoadingStatus = FetchStatus.Failed;
      // })
  }
});

export const {changeCurrentBookingId} = bookingSlice.actions;

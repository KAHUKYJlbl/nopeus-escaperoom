import { createSlice } from '@reduxjs/toolkit';

import { FetchStatus, NameSpace } from '../../const';
import { BookingInfo } from '../../types/booking/boking';
import { fetchMyQuests } from './api-actions';

type InitialState = {
  bookingLoadingStatus: FetchStatus;
  myQuests: BookingInfo[];
}

const initialState: InitialState = {
  bookingLoadingStatus: FetchStatus.Idle,
  myQuests: [],
};

export const bookingSlice = createSlice({
  name: NameSpace.Booking,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMyQuests.fulfilled, (state, action) => {
        state.bookingLoadingStatus = FetchStatus.Success;
        state.myQuests = action.payload;
      })
      .addCase(fetchMyQuests.pending, (state) => {
        state.bookingLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchMyQuests.rejected, (state) => {
        state.bookingLoadingStatus = FetchStatus.Failed;
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

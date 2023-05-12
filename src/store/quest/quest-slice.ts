import { createSlice } from '@reduxjs/toolkit';

import { FetchStatus, NameSpace } from '../../const';
import { Quest } from '../../types/quest/quest';
import { fetchQuestById, fetchQuests } from './api-actions';

type InitialState = {
  questLoadingStatus: FetchStatus;
  quest: Quest | null;
  questList: Quest[];
}

const initialState: InitialState = {
  questLoadingStatus: FetchStatus.Idle,
  quest: null,
  questList: [],
};

export const questSlice = createSlice({
  name: NameSpace.Quest,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuests.fulfilled, (state, action) => {
        state.questLoadingStatus = FetchStatus.Success;
        state.questList = action.payload;
      })
      .addCase(fetchQuests.pending, (state) => {
        state.questLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchQuests.rejected, (state) => {
        state.questLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchQuestById.fulfilled, (state, action) => {
        state.questLoadingStatus = FetchStatus.Success;
        state.quest = action.payload;
      })
      .addCase(fetchQuestById.pending, (state) => {
        state.questLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchQuestById.rejected, (state) => {
        state.questLoadingStatus = FetchStatus.Failed;
      })
  }
});

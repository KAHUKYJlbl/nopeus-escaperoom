import { createSlice } from '@reduxjs/toolkit';

import { FetchStatus, NameSpace } from '../../const';
import { MyQuestInfo } from '../../types/my-quests/my-quests';
import { DeleteMyQuest, fetchMyQuests } from './api-actions';

type InitialState = {
  myQuestsLoadingStatus: FetchStatus;
  myQuestDeletingStatus: FetchStatus;
  myQuests: MyQuestInfo[];
}

const initialState: InitialState = {
  myQuestsLoadingStatus: FetchStatus.Idle,
  myQuestDeletingStatus: FetchStatus.Idle,
  myQuests: [],
};

export const myQuestsSlice = createSlice({
  name: NameSpace.MyQuests,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMyQuests.fulfilled, (state, action) => {
        state.myQuestsLoadingStatus = FetchStatus.Success;
        state.myQuests = action.payload;
      })
      .addCase(fetchMyQuests.pending, (state) => {
        state.myQuestsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchMyQuests.rejected, (state) => {
        state.myQuestsLoadingStatus = FetchStatus.Failed;
      })
      .addCase(DeleteMyQuest.fulfilled, (state) => {
        state.myQuestDeletingStatus = FetchStatus.Success;
      })
      .addCase(DeleteMyQuest.pending, (state) => {
        state.myQuestDeletingStatus = FetchStatus.Pending;
      })
      .addCase(DeleteMyQuest.rejected, (state) => {
        state.myQuestDeletingStatus = FetchStatus.Failed;
      });
  }
});

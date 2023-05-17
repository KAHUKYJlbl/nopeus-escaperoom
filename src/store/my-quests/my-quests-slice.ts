import { createSlice } from '@reduxjs/toolkit';

import { FetchStatus, NameSpace } from '../../const';
import { MyQuestInfo } from '../../types/my-quests/my-quests';
import { fetchMyQuests } from './api-actions';

type InitialState = {
  myQuestsLoadingStatus: FetchStatus;
  myQuests: MyQuestInfo[];
}

const initialState: InitialState = {
  myQuestsLoadingStatus: FetchStatus.Idle,
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
      });
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

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { QuestLevel, NameSpace, QuestType } from '../../const';

type InitialState = {
  currentLevelFilter: QuestLevel;
  currentTypeFilter: QuestType;
}

const initialState: InitialState = {
  currentLevelFilter: QuestLevel.Any,
  currentTypeFilter: QuestType.All,
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCurrentLevelFilter: (state, action: PayloadAction<QuestLevel>) => {
      state.currentLevelFilter = action.payload;
    },
    changeCurrentTypeFilter: (state, action: PayloadAction<QuestType>) => {
      state.currentTypeFilter = action.payload;
    },
  },
});

export const {changeCurrentTypeFilter, changeCurrentLevelFilter} = appSlice.actions;

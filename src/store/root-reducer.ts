import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../const';
import { userSlice } from './user/user-slice';
import { questSlice } from './quest/quest-slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Quest]: questSlice.reducer,
});

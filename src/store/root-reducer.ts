import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../const';
import { userSlice } from './user/user-slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
});

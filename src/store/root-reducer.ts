import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../const';
import { userSlice } from './user/user-slice';
import { questSlice } from './quest/quest-slice';
import { appSlice } from './app/app-slice';
import { bookingSlice } from './booking/booking-slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Quest]: questSlice.reducer,
  [NameSpace.App]: appSlice.reducer,
  [NameSpace.Booking]: bookingSlice.reducer,
});

import { createSelector } from '@reduxjs/toolkit';

import { FetchStatus, NameSpace } from '../../const';
import { BookingInfo } from '../../types/booking/booking';
import { State } from '../../types/state/state';

export const getbookingSlots = (state: State): BookingInfo[] => state[NameSpace.Booking].bookingSlots;

export const getBookingSlotsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Booking].bookingSlotsLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

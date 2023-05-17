import { createSelector } from '@reduxjs/toolkit';

import { FetchStatus, NameSpace } from '../../const';
import { BookingInfo } from '../../types/booking/booking';
import { State } from '../../types/state/state';

export const getBookingSlots = (state: State): BookingInfo[] => state[NameSpace.Booking].bookingSlots;

export const getCurrentBookingId = (state: State): string | null => state[NameSpace.Booking].currentBookingId;

export const getBookingSlotsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Booking].bookingSlotsLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getBookingPostingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Booking].bookingPostingStatus,
  (status) => ({
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
  })
);

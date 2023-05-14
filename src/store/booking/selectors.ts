import { createSelector } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { BookingInfo } from '../../types/booking/boking';
import { State } from '../../types/state/state';

export const getMyQuests = (state: State): BookingInfo[] => state[NameSpace.Booking].myQuests;

export const getBookingLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Booking].bookingLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

import { createSelector } from '@reduxjs/toolkit';

import { State } from '../../types/state/state';
import { StoredUser } from '../../types/api/login';
import { AuthorizationStatus, FetchStatus, NameSpace } from '../../const';

export const getUser = (state: State): StoredUser | null => state[NameSpace.User].user;

export const getUserLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.User].userLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getAuthStatus = createSelector(
  (state: State): AuthorizationStatus => state[NameSpace.User].authStatus,
  (status) => ({
    auth: status === AuthorizationStatus.Auth,
    noAuth: status === AuthorizationStatus.NoAuth,
    unknown: status === AuthorizationStatus.Unknown,
  })
);

import { createSelector } from '@reduxjs/toolkit';

import { State } from '../../types/state/state';
import { StoredUser } from '../../types/api/login';
import { AuthorizationStatus, NameSpace } from '../../const';

export const getUser = (state: State): StoredUser | null => state[NameSpace.User].user;

export const getAuthStatus = createSelector(
  (state: State): AuthorizationStatus => state[NameSpace.User].authStatus,
  (status) => ({
    auth: status === AuthorizationStatus.Auth,
    noAuth: status === AuthorizationStatus.NoAuth,
    unknown: status === AuthorizationStatus.Unknown,
  })
);

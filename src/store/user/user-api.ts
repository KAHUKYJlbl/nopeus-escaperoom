import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../../services/api';
import { AuthData, User } from '../../types/api/login';
import { APIRoute, NameSpace } from '../../const';

export const userApi = createApi({
  reducerPath: NameSpace.UserApi,
  baseQuery,
  endpoints: (builder) => ({

    checkAuth: builder.query<User, void>({
      query: () => APIRoute.Login,
      extraOptions: {maxRetries: 3}
    }),

    login: builder.mutation<User, AuthData>({
      query: (authData) => ({
        url: APIRoute.Login,
        method: 'POST',
        body: authData,
      }),
      extraOptions: {maxRetries: 3}
    }),

    logout: builder.mutation({
      query: () => ({
        url: APIRoute.Logout,
        method: 'DELETE',
      }),
      extraOptions: {maxRetries: 3}
    }),

  }),
});

export const { useCheckAuthQuery, useLoginMutation, useLogoutMutation } = userApi;

import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

import { getToken } from './token';

const BACKEND_URL = 'https://grading.design.pages.academy/v1/escape-room';

export const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URL,
  prepareHeaders: (headers) => {
    const token = getToken();

    if (token && headers) {
      headers.set('x-token', token);
    }
  }
});

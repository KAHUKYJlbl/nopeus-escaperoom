import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';
import { createAPI } from '../services/api';

export const axios = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: axios,
      },
    }),
});

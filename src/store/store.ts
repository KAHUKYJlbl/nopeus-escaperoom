import { configureStore } from '@reduxjs/toolkit';

import { createAPI } from '../services/api';
import { rootReducer } from './root-reducer';

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

import { createAsyncThunk } from '@reduxjs/toolkit';
import { MyQuestInfo } from '../../types/my-quests/my-quests';
import { AppDispatch, State } from '../../types/state/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { toast } from 'react-toastify';

export const fetchMyQuests = createAsyncThunk<MyQuestInfo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'MyQuests/fetchMyQuests',
  async (_arg, {dispatch, extra: axios}) => {
    try {
      const {data} = await axios.get<MyQuestInfo[]>(APIRoute.MyQuests);
      // dispatch(fetchFavorites());
      return data;
    } catch (err) {
      toast.error('My quests loading failed. Please try again.');
      throw err;
    }
  },
);

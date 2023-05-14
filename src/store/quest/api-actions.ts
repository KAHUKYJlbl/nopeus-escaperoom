import { createAsyncThunk } from '@reduxjs/toolkit';
import { Quest, QuestFull } from '../../types/quest/quest';
import { AppDispatch, State } from '../../types/state/state';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { toast } from 'react-toastify';
import { generatePath } from 'react-router-dom';

export const fetchQuests = createAsyncThunk<Quest[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Quest/fetchQuests',
  async (_arg, {dispatch, extra: axios}) => {
    try {
      const {data} = await axios.get<Quest[]>(APIRoute.Quests);
      // dispatch(fetchFavorites());
      return data;
    } catch (err) {
      toast.error('Quests loading failed. Please try again.');
      throw err;
    }
  },
);

export const fetchQuestById = createAsyncThunk<QuestFull, Quest['id'] | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Quest/fetchQuestById',
  async (id='0', {dispatch, extra: axios}) => {
    try {
      const {data} = await axios.get<QuestFull>(generatePath(APIRoute.Quest, { questId: id }));
      // dispatch(fetchFavorites());
      return data;
    } catch (err) {
      toast.error('Quest loading failed. Please try again.');
      throw err;
    }
  },
);

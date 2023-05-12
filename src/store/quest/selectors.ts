import { createSelector } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Quest } from '../../types/quest/quest';
import { State } from '../../types/state/state';

export const getQuests = (state: State): Quest[] => state[NameSpace.Quest].questList;

export const getQuest = (state: State): Quest | null => state[NameSpace.Quest].quest;

export const getOffersLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Quest].questLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

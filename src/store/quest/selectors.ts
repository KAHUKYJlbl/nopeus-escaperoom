import { createSelector } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Quest, QuestFull } from '../../types/quest/quest';
import { State } from '../../types/state/state';

export const getQuests = (state: State): Quest[] => state[NameSpace.Quest].questList;

export const getQuest = (state: State): QuestFull | null => state[NameSpace.Quest].quest;

export const getQuestsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Quest].questLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

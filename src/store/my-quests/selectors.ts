import { createSelector } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { MyQuestInfo } from '../../types/booking/my-quests';
import { State } from '../../types/state/state';

export const getMyQuests = (state: State): MyQuestInfo[] => state[NameSpace.MyQuests].myQuests;

export const getMyQuestsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.MyQuests].myQuestsLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

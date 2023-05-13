import { QuestLevel, NameSpace, QuestType } from '../../const';
import { State } from '../../types/state/state';

export const getCurrentLevelFilter = (state: State): QuestLevel => state[NameSpace.App].currentLevelFilter;

export const getCurrentTypeFilter = (state: State): QuestType => state[NameSpace.App].currentTypeFilter;

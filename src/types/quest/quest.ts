import { QuestLevel, QuestType } from '../../const';

export type Quest = {
  id: string,
  title: string,
  previewImg: string,
  previewImgWebp: string,
  level: QuestLevel,
  type: QuestType,
  peopleMinMax: [number, number],
};

export type QuestFull = Quest & {
  description: string,
  coverImg: string,
  coverImgWebp: string,
};

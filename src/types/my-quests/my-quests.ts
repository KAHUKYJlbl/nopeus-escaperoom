import { Quest } from '../quest/quest';

export type MyQuestInfo = {
  date: string,
  time: string,
  contactPerson: string,
  phone: string,
  withChildren: boolean,
  peopleCount: number,
  id: string,
  location: Location,
  quest: Quest,
};

export type Location = {
  address: string,
  coords: [number, number],
};

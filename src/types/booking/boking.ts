import { Quest } from '../quest/quest';

export type BookingInfo = {
  date: string,
  time: string,
  contactPerson: string,
  phone: string,
  withChildren: boolean,
  peopleCount: number,
  id: string,
  location: {
    address: string,
    coords: number[],
  },
  quest: Quest,
};

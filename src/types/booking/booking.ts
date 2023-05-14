import { Location } from '../my-quests/my-quests';

export type BookingInfo = {
  id: string,
  location: Location,
  slots: {
    today: TimeSlot[],
    tomorrow: TimeSlot[],
  },
};

type TimeSlot = {
  time: string,
  isAvailable: boolean,
};

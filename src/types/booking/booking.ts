import { Location } from '../my-quests/my-quests';

export type BookingInfo = {
  id: string,
  location: Location,
  slots: {
    today: TimeSlot[],
    tomorrow: TimeSlot[],
  },
};

export type TimeSlot = {
  time: string,
  isAvailable: boolean,
};

export type BookingSlotsByLocations = {
  [location: string]: BookingInfo[];
};

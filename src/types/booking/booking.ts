import { Location } from '../my-quests/my-quests';

export type BookingInputsData = {
  contactPerson: string;
  phone: string;
  peopleCount: number;
};

export type FormBookingData = BookingInputsData & {
  dateTime: string;
  withChildren: boolean;
  userAgreement: boolean;
};

export type BookingData = BookingInputsData & {
  date: string;
  time: string;
  withChildren: boolean;
  placeId: string;
};

export type BookingInfo = {
  id: string;
  location: Location;
  slots: {
    today: TimeSlot[];
    tomorrow: TimeSlot[];
  };
};

export type TimeSlot = {
  time: string;
  isAvailable: boolean;
};

export type BookingSlotsByLocations = {
  [location: string]: BookingInfo[];
};

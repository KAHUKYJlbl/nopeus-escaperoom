import { BookingInfo, BookingSlotsByLocations } from '../types/booking/booking';

export const getBookingSlotsByLocations = (favorites: BookingInfo[]) => (
  favorites.reduce<BookingSlotsByLocations>((acc, current) => {
    if (acc[current.location.address]) {
      acc[current.location.address].push(current);
    } else {
      acc[current.location.address] = [current];
    }
    return acc;
  }, {})
);

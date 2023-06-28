import { BookingContext } from '../context/BookingContext';

import { useContext } from 'react';

export const useBookingContext = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw Error('Booking context must be used inside its provider');
  }

  return context;
};

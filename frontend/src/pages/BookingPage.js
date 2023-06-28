import { useEffect, useMemo, useState } from 'react';
import { useBookingContext } from '../hooks/useBookingsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEquipmentsContext } from '../hooks/useEquipmentsContext';

//calendar
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import BookingForm from '../components/BookingForm';

const locales = {
  'en-GB': require('date-fns/locale/en-GB'),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BookingPage = () => {
  const { state: bookingState, dispatch: dispatchBookings } =
    useBookingContext();
  const { state: authState, dispatch: dispatchUser } = useAuthContext();
  const { state: equipmentsState, dispatch: dispatchEquipments } =
    useEquipmentsContext();
  const user = authState.user;

  useEffect(() => {
    //reset equipments and bookings
    dispatchEquipments({ type: 'SET_EQUIPMENTS', payload: null });
    dispatchBookings({ type: 'SET_BOOKINGS', payload: null });

    //fetch all bookings
    const fetchBookings = async () => {
      const response = await fetch('/api/bookings', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      let json = await response.json();

      if (response.ok) {
        dispatchBookings({ type: 'SET_BOOKINGS', payload: json });
      }
    };

    //fetch all equipments
    const fetchEquipments = async () => {
      const response = await fetch('/api/equipments/all', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatchEquipments({ type: 'SET_EQUIPMENTS', payload: json });
      }
    };

    if (user) {
      fetchEquipments();
      fetchBookings();
    }
  }, [dispatchBookings, user, dispatchEquipments]);

  const { views, ...otherProps } = useMemo(
    () => ({
      views: {
        month: true,
      },
    }),
    []
  );

  return (
    <>
      <div>
        <Calendar
          localizer={localizer}
          events={bookingState.bookings?.map((booking) => {
            return {
              title: booking.name,
              start: new Date(booking.startDate),
              end: new Date(booking.endDate),
            };
          })}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: '50px' }}
          // views={views}
        />
      </div>
      <BookingForm></BookingForm>
    </>
  );
};

export default BookingPage;

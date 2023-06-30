import { useEffect, useState } from 'react';
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
  const { state: authState } = useAuthContext();
  const { state: equipmentsState, dispatch: dispatchEquipments } =
    useEquipmentsContext();
  const user = authState.user;

  //keep track of selected booking to delete
  const [currentBooking, setCurrentBooking] = useState(null);

  const handleEventSelection = (clickedBooking) => {
    clickedBooking.equipment = equipmentsState.equipments.find(
      (e) => e._id === clickedBooking.equipment_id
    );
    setCurrentBooking(clickedBooking);
  };

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch('/api/bookings/' + currentBooking._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatchBookings({ type: 'DELETE_BOOKING', payload: json });
      setCurrentBooking(null);
    }
  };

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

  return (
    <>
      <h2>Your Current Bookings</h2>
      <div className="bookings-container">
        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={bookingState.bookings?.map((booking) => {
              return {
                title: booking.name,
                start: new Date(booking.startDate),
                end: new Date(booking.endDate),
                ...booking,
              };
            })}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: '50px' }}
            onSelectEvent={handleEventSelection}
          />
        </div>
        <div className="booking-info-container">
          {currentBooking ? (
            <>
              <h2 style={{ 'textAlign': 'center' }}>
                {"Booking for " + currentBooking.equipment.name + ":"}
              </h2>
              <p>
                <strong>Description: </strong>
                {currentBooking.equipment.description}
              </p>
              <p>
                <strong>Price: </strong>
                {currentBooking.equipment.price}
              </p>
              <p>
                <strong>Postcode: </strong>
                {currentBooking.equipment.postcode}
              </p>
              <span className="delete-button" onClick={handleClick}>
                Delete Booking
              </span>
            </>
          ) : (
            <h2 style={{ 'textAlign': 'center' }}>
              Please select a booking to view it
            </h2>
          )}
        </div>
      </div>
      <BookingForm></BookingForm>
    </>
  );
};

export default BookingPage;

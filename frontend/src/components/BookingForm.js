import { useState } from 'react';
import { useBookingContext } from '../hooks/useBookingsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEquipmentsContext } from '../hooks/useEquipmentsContext';
//leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';

//datepicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = () => {
  const { dispatch: dispatchBookings } = useBookingContext();

  const { state: equipmentsState } = useEquipmentsContext();
  const { state: authState } = useAuthContext();
  const equipments = equipmentsState.equipments;
  const user = authState.user;

  //errors of booking
  const [error, setError] = useState(null);

  //current booking

  const [newBooking, setNewBooking] = useState({
    name: '',
    equipment_id: '',
    startDate: '',
    endDate: '',
  });

  const customIcon = new Icon({
    // iconUrl: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
    iconUrl: require('../img/marker-icon.png'),
    iconSize: [38, 38],
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: 'custom-marker-cluster',
      iconSize: point(33, 33, true),
    });
  };

  const handleAddBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const booking = { ...newBooking, user_id: user._id };
    const response = await fetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      //reset
      setNewBooking({ ...newBooking, startDate: '', endDate: '' });
      setError(null);
      console.log('new booking added', json);
      dispatchBookings({ type: 'CREATE_BOOKING', payload: json });
    }
  };

  return (
    <>
      <h2>Book More Equipment</h2>
      <div className="map-container">
        <div>
          <MapContainer center={[51.76227, -1.26221]} zoom={8}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createCustomClusterIcon}
              showCoverageOnHover={false}
            >
              {equipments?.map((marker) => (
                <Marker
                  key={marker._id}
                  position={marker.geocode}
                  icon={customIcon}
                >
                  <Popup>
                    <h4>{marker.name}</h4>
                    <p>
                      <strong>Description: </strong>
                      {marker.description}
                    </p>
                    <p>
                      <strong>Price: </strong>
                      {marker.price}
                    </p>
                    <p>
                      <strong>Postcode: </strong>
                      {marker.postcode}
                    </p>
                    <button
                      onClick={() =>
                        setNewBooking({
                          ...newBooking,
                          name: marker.name,
                          equipment_id: marker._id,
                        })
                      }
                    >
                      Book
                    </button>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>{' '}
          </MapContainer>
        </div>
        <form className="booking-container" onSubmit={handleAddBooking}>
          <h3>Book Equipment</h3>
          {newBooking.name ? (
            <>
              <h4>Add New Booking for {newBooking.name}</h4>

              <DatePicker
                placeholderText="Start Date"
                selected={newBooking.startDate}
                onChange={(startDate) =>
                  setNewBooking({ ...newBooking, startDate })
                }
              />
              <DatePicker
                placeholderText="End Date"
                selected={newBooking.endDate}
                onChange={(endDate) =>
                  setNewBooking({ ...newBooking, endDate })
                }
              />
              <button>Add Booking</button>
            </>
          ) : (
            <h4>Please select an equipment to book it on the calendar.</h4>
          )}
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </>
  );
};

export default BookingForm;

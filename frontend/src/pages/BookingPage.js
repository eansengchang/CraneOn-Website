import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useEquipmentsContext } from '../hooks/useEquipmentsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const BookingPage = () => {
  const customIcon = new Icon({
    // iconUrl: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
    iconUrl: require('../img/marker-icon.png'),
    iconSize: [38, 38],
  });

  const { state, dispatch } = useEquipmentsContext();
  const { state: authState } = useAuthContext();

  const equipments = state.equipments;
  const user = authState.user;

  useEffect(() => {
    //fetch all equipments
    const fetchEquipments = async () => {
      const response = await fetch('/api/equipments/all', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      let json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_EQUIPMENTS', payload: json });
      }
    };

    if (user) {
      fetchEquipments();
    }
  }, [dispatch, user]);

  return (
    <>
      <MapContainer center={[51.76227, -1.26221]} zoom={8} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {equipments?.map((marker) => {
          console.log(marker.geocode);
          return (
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
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
};

export default BookingPage;

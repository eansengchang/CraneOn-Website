import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { EquipmentsContextProvider } from './context/EquipmentContext';
import { AuthContextProvider } from './context/AuthContext';
import { BookingContextProvider } from './context/BookingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EquipmentsContextProvider>
        <BookingContextProvider>
          <App />
        </BookingContextProvider>
      </EquipmentsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

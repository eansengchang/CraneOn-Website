import { createContext, useReducer } from 'react';

export const BookingContext = createContext();

//this context keeps track of all the bookings so that it is the same as the database
export const bookingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKINGS':
      return {
        ...action.payload,
        bookings: action.payload,
      };
    case 'CREATE_BOOKING': {
      return {
        ...action.payload,
        bookings: [action.payload, ...state.bookings],
      };
    }
    case 'DELETE_BOOKING':
      return {
        ...action.payload,
        bookings: state.bookings.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const BookingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingsReducer, {
    bookings: null,
    availabilities: null,
  });

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

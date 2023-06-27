import { createContext, useReducer } from 'react';

export const EquipmentsContext = createContext();

//this context keeps track of all the equipments so that it is the same as the database
export const equipmentsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EQUIPMENTS':
      return {
        equipments: action.payload,
      };
    case 'CREATE_EQUIPMENT':
      return {
        equipments: [action.payload, ...state.equipments],
      };
    case 'DELETE_EQUIPMENT':
      return {
        equipments: state.equipments.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};


export const EquipmentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(equipmentsReducer, {
    equipments: null,
  });

  return (
    <EquipmentsContext.Provider value={{ state, dispatch }}>
      {children}
    </EquipmentsContext.Provider>
  );
};

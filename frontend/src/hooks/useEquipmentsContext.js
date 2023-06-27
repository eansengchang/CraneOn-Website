import { EquipmentsContext } from '../context/EquipmentContext';

import { useContext } from 'react';

export const useEquipmentsContext = () => {
  const context = useContext(EquipmentsContext);

  if (!context) {
    throw Error('Equipment context must be used inside its provider');
  }

  return context;
};

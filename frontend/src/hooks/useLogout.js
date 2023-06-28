import { useAuthContext } from './useAuthContext';
import { useEquipmentsContext } from './useEquipmentsContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: equipmentDispatch } = useEquipmentsContext();

  const logout = () => {
    //remove user from storage
    localStorage.removeItem('user');

    //dispatch logout action
    dispatch({ type: 'LOGOUT' });
    equipmentDispatch({ type: 'SET_EQUIPMENTS', payload: null });
    equipmentDispatch({ type: 'SET_BOOKINGS', payload: null });
  };

  return { logout };
};

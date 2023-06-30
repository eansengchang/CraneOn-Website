import { useEffect } from 'react';
import { useEquipmentsContext } from '../hooks/useEquipmentsContext';
import { useAuthContext } from '../hooks/useAuthContext';

//components
import EquipmentDetails from '../components/Details/Details';
import EquipmentForm from '../components/EquipmentForm';

const EquipmentsPage = () => {
  const { state, dispatch } = useEquipmentsContext();
  const { state: authState } = useAuthContext();

  const equipments = state.equipments;
  const user = authState.user;

  useEffect(() => {
    //reset all equipments
    dispatch({ type: 'SET_EQUIPMENTS', payload: null });
    //fetch all equipments
    const fetchEquipments = async () => {
      const response = await fetch('https://craneon-test.eansengchang.repl.co/api/equipments', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_EQUIPMENTS', payload: json });
      }
    };

    if (user) {
      fetchEquipments();
    }
  }, [dispatch, user]);

  return (
    <div className="equipmentspage">
      <div>
        {equipments ? (
          equipments.length > 0 ? (
            equipments?.map((equipment) => (
              <EquipmentDetails
                key={equipment._id}
                equipment={equipment}
              ></EquipmentDetails>
            ))
          ) : (
            <div>You are not advertising any equipment yet</div>
          )
        ) : (
          <div>Loading equipments...</div>
        )}
      </div>
      <EquipmentForm></EquipmentForm>
    </div>
  );
};

export default EquipmentsPage;

import { Detail } from '../Details/DetailsElements';
import { useEquipmentsContext } from '../../hooks/useEquipmentsContext';
import { useAuthContext } from '../../hooks/useAuthContext';

const EquipmentDetails = ({ equipment }) => {
  const { dispatch } = useEquipmentsContext();
  const { state } = useAuthContext();
  const user = state.user;

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('https://craneon-test.eansengchang.repl.co/api/equipments/' + equipment._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_EQUIPMENT', payload: json });
    }
  };

  return (
    <Detail>
      <h4>{equipment.name}</h4>
      <p>
        <strong>Description: </strong>
        {equipment.description}
      </p>
      <p>
        <strong>Price: </strong>
        {equipment.price}
      </p>
      <p>
        <strong>Postcode: </strong>
        {equipment.postcode}
      </p>
      <p>{equipment.createdAt}</p>
      <span onClick={handleClick}>delete</span>
    </Detail>
  );
};

export default EquipmentDetails;

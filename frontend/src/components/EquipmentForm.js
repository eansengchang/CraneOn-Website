import { useState } from 'react';
import { useEquipmentsContext } from '../hooks/useEquipmentsContext';
import { useAuthContext } from '../hooks/useAuthContext';

import { isValid, fix } from 'postcode';

const EquipmentForm = () => {
  const { dispatch } = useEquipmentsContext();
  const { state } = useAuthContext();
  const user = state.user;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [postcode, setPostcode] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    if (!isValid(postcode)) {
      setError('Postcode is not valid');
      return;
    }

    const equipment = { name, description, postcode: fix(postcode), price };
    const response = await fetch('https://craneon-test.eansengchang.repl.co/api/equipments', {
      method: 'POST',
      body: JSON.stringify(equipment),
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
      setName('');
      setDescription('');
      setPrice('');
      setPostcode('');
      setError(null);
      console.log('new equipment added', json);
      dispatch({ type: 'CREATE_EQUIPMENT', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Advertise another equipment</h3>
      <label>Name</label>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />

      <label>Description</label>
      <input
        type="text"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        value={description}
      />

      <label>Postcode</label>
      <input
        type="text"
        onChange={(e) => {
          setPostcode(e.target.value);
        }}
        value={postcode}
      />

      <label>Price</label>
      <input
        type="number"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
      />

      <button>Add Equipment</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default EquipmentForm;

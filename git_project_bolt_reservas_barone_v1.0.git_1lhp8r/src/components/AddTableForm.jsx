import React, { useState } from 'react';

function AddTableForm({ addTable }) {
  const [capacity, setCapacity] = useState('');
  const [zoneId, setZoneId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTable = {
      capacity: parseInt(capacity, 10),
      zone_id: zoneId
    };
    addTable(newTable);
    setCapacity('');
    setZoneId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Capacidad"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="ID de Zona"
        value={zoneId}
        onChange={(e) => setZoneId(e.target.value)}
        required
      />
      <button type="submit">Agregar Mesa</button>
    </form>
  );
}

export default AddTableForm;

import React, { useState, useEffect } from 'react';

function ReservationForm({ addReservation, tables, editingReservation }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [tableId, setTableId] = useState('');
  const [segundaMesa, setSegundaMesa] = useState(''); // Nuevo estado para segunda mesa
  const [isEvent, setIsEvent] = useState(false);
  const [cantidadPersonas, setCantidadPersonas] = useState('');

  useEffect(() => {
    if (editingReservation) {
      setName(editingReservation.name || '');
      setDate(editingReservation.date || '');
      setTime(editingReservation.time || '');
      setTableId(editingReservation.table_id || '');
      setSegundaMesa(editingReservation.segunda_mesa || ''); // Nuevo campo
      setIsEvent(editingReservation.is_event || false);
      setCantidadPersonas(editingReservation.cantidad_personas || '');
    } else {
      setSegundaMesa(''); // Resetear al agregar nueva reserva
      setCantidadPersonas('');
    }
  }, [editingReservation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservation = {
      table_id: tableId,
      segunda_mesa: segundaMesa || null, // Asignar null si no hay segunda mesa
      name,
      date,
      time,
      is_event: isEvent,
      cantidad_personas: parseInt(cantidadPersonas, 10)
    };
    addReservation(newReservation);
    setName('');
    setDate('');
    setTime('');
    setTableId('');
    setSegundaMesa(''); // Resetear al agregar nueva reserva
    setIsEvent(false);
    setCantidadPersonas('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <select
        value={tableId}
        onChange={(e) => setTableId(e.target.value)}
        required
      >
        <option value="">Seleccionar Mesa</option>
        {tables.map((table) => (
          <option key={table.id} value={table.id}>
            Mesa {table.id} (Capacidad: {table.capacity})
          </option>
        ))}
      </select>
      <select
        value={segundaMesa}
        onChange={(e) => setSegundaMesa(e.target.value)}
      >
        <option value="">Seleccionar Segunda Mesa (opcional)</option>
        {tables.map((table) => (
          <option key={table.id} value={table.id}>
            Mesa {table.id} (Capacidad: {table.capacity})
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Cantidad de Personas"
        value={cantidadPersonas}
        onChange={(e) => setCantidadPersonas(e.target.value)}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={isEvent}
          onChange={(e) => setIsEvent(e.target.checked)}
        />
        Es Evento
      </label>
      <button type="submit">Agregar Reserva</button>
    </form>
  );
}

export default ReservationForm;

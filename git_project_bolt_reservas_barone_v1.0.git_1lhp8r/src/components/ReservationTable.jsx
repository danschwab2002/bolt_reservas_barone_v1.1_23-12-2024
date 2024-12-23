import React from 'react';

function ReservationTable({ reservations, removeReservation, setEditingReservation }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>ID de Mesa</th>
          <th>Zona</th>
          <th>Cantidad de Personas</th>
          <th>Segunda Mesa</th>
          <th>Es Evento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation.id}>
            <td>{reservation.name}</td>
            <td>{reservation.date}</td>
            <td>{reservation.time}</td>
            <td>{reservation.table_id}</td>
            <td>{reservation.tables?.zones?.name || 'N/A'}</td> {/* Manejo de datos no definidos */}
            <td>{reservation.cantidad_personas}</td>
            <td>{reservation.segunda_mesa ? reservation.segunda_mesa : 'N/A'}</td>
            <td>{reservation.is_event ? 'Sí' : 'No'}</td>
            <td>
              <button onClick={() => setEditingReservation(reservation)}>Editar</button>
              <button onClick={() => removeReservation(reservation.id)}>Cancelar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReservationTable;

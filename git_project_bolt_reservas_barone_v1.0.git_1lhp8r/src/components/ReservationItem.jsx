import React from 'react';

    function ReservationItem({ reservation, removeReservation }) {
      return (
        <li>
          <span>{reservation.name} - {reservation.date} at {reservation.time} - Table ID: {reservation.table_id}</span>
          <button onClick={() => removeReservation(reservation.id)}>Cancel</button>
        </li>
      );
    }

    export default ReservationItem;

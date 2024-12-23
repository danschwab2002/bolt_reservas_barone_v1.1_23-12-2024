import React from 'react';
    import ReservationItem from './ReservationItem';

    function ReservationList({ reservations, removeReservation }) {
      return (
        <ul>
          {reservations.map((reservation) => (
            <ReservationItem
              key={reservation.id}
              reservation={reservation}
              removeReservation={removeReservation}
            />
          ))}
        </ul>
      );
    }

    export default ReservationList;

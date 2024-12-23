import React, { useState, useEffect } from 'react';
import ReservationForm from './components/ReservationForm';
import ReservationTable from './components/ReservationTable';
import TableList from './components/TableList';
import ZoneList from './components/ZoneList';
import AddTableForm from './components/AddTableForm';
import { supabase } from './supabaseClient';

function App() {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [zones, setZones] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null);

  useEffect(() => {
    fetchTables();
    fetchReservations();
    fetchZones();
  }, []);

  const fetchTables = async () => {
    const { data, error } = await supabase.from('tables').select(`
      *,
      zones (name)
    `);
    if (error) console.error('Error fetching tables:', error);
    else setTables(data);
  };

  const fetchReservations = async () => {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        table:table_id (
          *,
          zones (name)
        ),
        second_table:segunda_mesa (
          *,
          zones (name)
        )
      `);
    if (error) console.error('Error fetching reservations:', error);
    else setReservations(data);
  };

  const fetchZones = async () => {
    const { data, error } = await supabase.from('zones').select();
    if (error) console.error('Error fetching zones:', error);
    else setZones(data);
  };

  const checkTableAvailability = async (tableId, segundaMesaId, date, time) => {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .or(`(table_id.eq.${tableId},segunda_mesa.eq.${segundaMesaId})`)
      .gte('date', date)
      .eq('time', time);

    if (error) {
      console.error('Error checking table availability:', error);
      return false;
    }

    return data.length === 0; // Devuelve true si no hay reservas
  };

  const addReservation = async (reservation) => {
    const isAvailable = await checkTableAvailability(reservation.table_id, reservation.segunda_mesa, reservation.date, reservation.time);

    if (!isAvailable) {
      alert('Una o ambas mesas están ocupadas en la fecha y hora seleccionadas.');
      return;
    }

    const { data, error } = await supabase.from('reservations').insert([reservation]);
    if (error) {
      console.error('Error adding reservation:', error);
    } else {
      setReservations([...reservations, ...data]);
    }
  };

  const addTable = async (table) => {
    const { data, error } = await supabase.from('tables').insert([table]);
    if (error) {
      console.error('Error adding table:', error);
    } else {
      setTables([...tables, ...data]);
    }
  };

  const removeReservation = async (id) => {
    await supabase.from('reservations').delete().eq('id', id);
    setReservations(reservations.filter(reservation => reservation.id !== id));
  };

  const deleteTable = async (id) => {
    const { error } = await supabase.from('tables').delete().eq('id', id);
    if (error) console.error('Error deleting table:', error);
    else setTables(tables.filter(table => table.id !== id));
  };

  const toggleZone = async (id, habilitado) => {
    const { data, error } = await supabase
      .from('zones')
      .update({ habilitado })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating zone:', error);
    } else {
      setZones(zones.map(zone => (zone.id === id ? { ...zone, habilitado } : zone)));
    }
  };

  return (
    <div className="container">
      <h1>Reservas de Restaurante</h1>
      <ReservationForm addReservation={addReservation} tables={tables} editingReservation={editingReservation} />
      <ReservationTable
        reservations={reservations}
        removeReservation={removeReservation}
        setEditingReservation={setEditingReservation}
      />
      <AddTableForm addTable={addTable} />
      <TableList tables={tables} deleteTable={deleteTable} />
      <ZoneList zones={zones} toggleZone={toggleZone} />
    </div>
  );
}

export default App;

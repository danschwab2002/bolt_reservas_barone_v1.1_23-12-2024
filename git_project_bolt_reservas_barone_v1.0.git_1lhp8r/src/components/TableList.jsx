import React from 'react';

function TableList({ tables, deleteTable }) {
  return (
    <div>
      <h2>Mesas</h2>
      <table>
        <thead>
          <tr>
            <th>ID de Mesa</th>
            <th>Capacidad</th>
            <th>Zona</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <tr key={table.id}>
              <td>{table.id}</td>
              <td>{table.capacity}</td>
              <td>{table.zone_id}</td>
              <td>
                <button onClick={() => deleteTable(table.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableList;

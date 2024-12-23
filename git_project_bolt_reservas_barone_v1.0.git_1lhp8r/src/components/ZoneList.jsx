import React from 'react';

function ZoneList({ zones, toggleZone }) {
  return (
    <div>
      <h2>Zonas</h2>
      <table>
        <thead>
          <tr>
            <th>ID de Zona</th>
            <th>Nombre</th>
            <th>Habilitado</th>
            <th>Acciones</th> {/* Nueva columna para acciones */}
          </tr>
        </thead>
        <tbody>
          {zones.map((zone) => (
            <tr key={zone.id}>
              <td>{zone.id}</td>
              <td>{zone.name}</td>
              <td>{zone.habilitado ? 'Sí' : 'No'}</td>
              <td>
                <button onClick={() => toggleZone(zone.id, !zone.habilitado)}>
                  {zone.habilitado ? 'Cerrar' : 'Abrir'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ZoneList;

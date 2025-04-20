import React from 'react';

const PatientList = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lista de Pacientes</h2>
      <div className="row">
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Diagnóstico</th>
                <th>Última Visita</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Juan Pérez</td>
                <td>45</td>
                <td>Hipertensión</td>
                <td>2024-03-15</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">Ver</button>
                  <button className="btn btn-secondary btn-sm">Editar</button>
                </td>
              </tr>
              {/* More patient rows would go here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientList;

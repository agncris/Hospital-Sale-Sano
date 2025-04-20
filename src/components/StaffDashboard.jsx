import React from 'react';
import { Link } from 'react-router-dom';

const StaffDashboard = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Panel de Staff</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Agenda</h5>
              <p className="card-text">Ver agenda de citas</p>
              <Link to="/staff/schedule" className="btn btn-primary">Ver Agenda</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Registro</h5>
              <p className="card-text">Registrar pacientes</p>
              <Link to="/staff/register-patient" className="btn btn-primary">Registrar</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;

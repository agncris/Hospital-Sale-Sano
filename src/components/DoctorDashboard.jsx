import React from 'react';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Panel de Doctor</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Mis Pacientes</h5>
              <p className="card-text">Ver y gestionar pacientes</p>
              <Link to="/doctor/patients" className="btn btn-primary">Ver Pacientes</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Citas</h5>
              <p className="card-text">Gestionar citas médicas</p>
              <Link to="/doctor/appointments" className="btn btn-primary">Ver Citas</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

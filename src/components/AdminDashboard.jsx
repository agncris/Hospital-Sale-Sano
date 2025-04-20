import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Panel de Administración</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Gestión de Doctores</h5>
              <p className="card-text">Administra el personal médico</p>
              <Link to="/admin/doctors" className="btn btn-primary">Gestionar Doctores</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Reportes</h5>
              <p className="card-text">Ver estadísticas y reportes</p>
              <Link to="/admin/reports" className="btn btn-primary">Ver Reportes</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Configuración</h5>
              <p className="card-text">Configuración del sistema</p>
              <Link to="/admin/settings" className="btn btn-primary">Configurar</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

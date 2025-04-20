import React, { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';

const Appointments = () => {
  const { appointments, addNewAppointment, removeAppointment } = useAppointments();
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    patient: '',
    doctor: '',
    status: 'Pendiente',
  });

  const handleAdd = () => {
    if (newAppointment.date && newAppointment.time && newAppointment.patient && newAppointment.doctor) {
      addNewAppointment(newAppointment);
      setNewAppointment({ date: '', time: '', patient: '', doctor: '', status: 'Pendiente' });
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Gestión de Citas</h2>
      <div className="row">
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Paciente</th>
                <th>Doctor</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td>{appt.patient}</td>
                  <td>{appt.doctor}</td>
                  <td>{appt.status}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2">Modificar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => removeAppointment(appt.id)}>Cancelar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <h4>Agregar Nueva Cita</h4>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="date"
                  name="date"
                  value={newAppointment.date}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Fecha"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="time"
                  name="time"
                  value={newAppointment.time}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Hora"
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  name="patient"
                  value={newAppointment.patient}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Paciente"
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  name="doctor"
                  value={newAppointment.doctor}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Doctor"
                />
              </div>
              <div className="col-md-1">
                <button className="btn btn-success" onClick={handleAdd}>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;

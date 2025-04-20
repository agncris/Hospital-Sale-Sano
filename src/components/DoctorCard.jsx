import React from 'react';
import PropTypes from 'prop-types';

function DoctorCard({ doctor }) {
  return (
    <div className="card mb-3 h-100">
      <img src={doctor.imagen} className="card-img-top" alt={`${doctor.nombre}`} style={{ width: '100%', height: '200px', objectFit: 'cover', objectPosition: 'top' }} />
      <div className="card-body">
        <h5 className="card-title">{doctor.nombre}</h5>
        <p className="card-text"><strong>Especialidad:</strong> {doctor.especialidad}</p>
        <p className="card-text"><strong>Descripción:</strong> {doctor.descripcion}</p>
        <p className="card-text"><strong>Años de Experiencia:</strong> {doctor.experiencia}</p>
        <p className="card-text"><strong>Contacto:</strong> {doctor.contacto.telefono}, {doctor.contacto.email}</p>
        <p className="card-text"><strong>Disponibilidad:</strong></p>
        <ul className="list-group list-group-flush">
          {Object.entries(doctor.disponibilidad).map(([dia, horas], index) => (
            <li key={index} className="list-group-item">{dia}: {horas}</li>
          ))}
        </ul>
        <p className="card-text"><strong>Consultas:</strong></p>
        <ul className="list-group list-group-flush">
          {doctor.consultas.map((consulta, index) => (
            <li key={index} className="list-group-item">{consulta.dia}: {consulta.horas} horas</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    especialidad: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    experiencia: PropTypes.number.isRequired,
    contacto: PropTypes.shape({
      telefono: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    disponibilidad: PropTypes.object.isRequired,
    consultas: PropTypes.arrayOf(
      PropTypes.shape({
        dia: PropTypes.string.isRequired,
        horas: PropTypes.number.isRequired,
      })
    ).isRequired,
    imagen: PropTypes.string.isRequired,
  }).isRequired,
};

export default DoctorCard;

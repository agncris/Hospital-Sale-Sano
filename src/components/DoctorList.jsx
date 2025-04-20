import React from 'react';
import { useDoctors } from '../context/DoctorContext';

const DoctorList = () => {
  const { doctors, loading, error } = useDoctors();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Doctors</h2>
      <div className="row">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={doctor.imagen} className="card-img-top" alt={doctor.nombre} />
              <div className="card-body">
                <h5 className="card-title">{doctor.nombre}</h5>
                <p className="card-text">{doctor.especialidad}</p>
                <p className="card-text">{doctor.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
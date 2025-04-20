import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const AppointmentForm = ({ doctors, onSubmit }) => {
  const [patientName, setPatientName] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const patientNameRef = useRef(null);

  // Obtener la fecha de hoy en formato YYYY-MM-DD para establecer el mínimo en el input date
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (patientNameRef.current) {
      patientNameRef.current.focus();
    }
  }, []);

  const validateForm = () => {
    const errors = {};
    
    if (!patientName.trim()) {
      errors.patientName = 'El nombre del paciente es requerido';
    }
    
    if (!selectedDoctor) {
      errors.selectedDoctor = 'Debe seleccionar un doctor';
    }
    
    if (!date) {
      errors.date = 'La fecha es requerida';
    } else {
      const selectedDate = new Date(date);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Reset time part for comparison
      
      if (selectedDate < currentDate) {
        errors.date = 'No se puede seleccionar una fecha pasada';
      }
    }
    
    if (!selectedService) {
      errors.selectedService = 'Debe seleccionar un servicio';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({ 
        name: patientName, 
        doctor: selectedDoctor, 
        date, 
        service: selectedService 
      });
    }
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre del Paciente:</label>
        <input 
          type="text" 
          className={`form-control ${formErrors.patientName ? 'is-invalid' : ''}`}
          value={patientName} 
          onChange={(e) => setPatientName(e.target.value)} 
          ref={patientNameRef} 
          required 
        />
        {formErrors.patientName && (
          <div className="invalid-feedback">{formErrors.patientName}</div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Seleccionar Doctor:</label>
        <select 
          className={`form-select ${formErrors.selectedDoctor ? 'is-invalid' : ''}`}
          value={selectedDoctor} 
          onChange={(e) => setSelectedDoctor(e.target.value)} 
          required
        >
          <option value="">Seleccione un doctor</option>
          {doctors.map((doctor, index) => (
            <option key={doctor.email || index} value={doctor.nombre}>{doctor.nombre}</option>
          ))}
        </select>
        {formErrors.selectedDoctor && (
          <div className="invalid-feedback">{formErrors.selectedDoctor}</div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Seleccionar Servicio:</label>
        <select 
          className={`form-select ${formErrors.selectedService ? 'is-invalid' : ''}`}
          value={selectedService} 
          onChange={(e) => setSelectedService(e.target.value)} 
          required
        >
          <option value="">Seleccione un servicio</option>
          <option value="Consulta">Consulta</option>
          <option value="Urgencia">Urgencia</option>
          <option value="Especialidad">Especialidad</option>
        </select>
        {formErrors.selectedService && (
          <div className="invalid-feedback">{formErrors.selectedService}</div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Fecha:</label>
        <input 
          type="date" 
          className={`form-control ${formErrors.date ? 'is-invalid' : ''}`}
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          min={today} // Esto evita seleccionar fechas pasadas
          required 
        />
        {formErrors.date && (
          <div className="invalid-feedback">{formErrors.date}</div>
        )}
      </div>
      <button type="submit" className="btn btn-primary">Agendar Cita</button>
    </form>
  );
};

AppointmentForm.propTypes = {
  doctors: PropTypes.arrayOf(
    PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      email: PropTypes.string, // Email opcional para key
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AppointmentForm;
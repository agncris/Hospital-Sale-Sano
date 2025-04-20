import React, { useEffect } from 'react';
import { useDoctors } from '../context/DoctorContext';
import useForm from '../hooks/useForm';

const DoctorForm = () => {
  const { addDoctor } = useDoctors();
  
  const validations = {
    nombre: { 
      required: true,
      pattern: /^[a-zA-Z\s]{2,50}$/,
      message: 'Nombre debe tener entre 2 y 50 caracteres'
    },
    especialidad: { required: true },
    descripcion: { required: true }
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useForm({
    nombre: '',
    especialidad: '',
    descripcion: '',
    imagen: ''
  }, validations);

  useEffect(() => {
    // Cleanup effect
    return () => {
      // Cleanup code here if needed
    };
  }, []);

  const onSubmit = async (formData) => {
    try {
      await addDoctor(formData);
      // Success handling
    } catch (error) {
      console.error('Error adding doctor:', error);
      throw new Error('Error al agregar doctor');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Agregar Doctor</h2>
      {errors.submit && (
        <div className="alert alert-danger">{errors.submit}</div>
      )}
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit);
      }}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
            required
          />
          {errors.nombre && (
            <div className="text-danger">{errors.nombre}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="especialidad" className="form-label">Especialidad</label>
          <input
            type="text"
            className="form-control"
            id="especialidad"
            name="especialidad"
            value={values.especialidad}
            onChange={handleChange}
            required
          />
          {errors.especialidad && (
            <div className="text-danger">{errors.especialidad}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={values.descripcion}
            onChange={handleChange}
            required
          ></textarea>
          {errors.descripcion && (
            <div className="text-danger">{errors.descripcion}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">Imagen URL</label>
          <input
            type="text"
            className="form-control"
            id="imagen"
            name="imagen"
            value={values.imagen}
            onChange={handleChange}
            required
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Agregando...' : 'Agregar Doctor'}
        </button>
      </form>
    </div>
  );
};

export default DoctorForm;

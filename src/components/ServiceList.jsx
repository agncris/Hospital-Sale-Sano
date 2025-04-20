import { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';

// Componente para listar los servicios médicos disponibles.
const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    // Simulación de fetching de datos
    try {
      // Aquí se realizaría una petición a la API real
      // Por ahora, utilizamos datos de ejemplo
      const mockServices = [
        {
          id: 1,
          name: 'Consulta General',
          description: 'Consulta médica general para evaluar su estado de salud',
          image: 'https://placehold.co/600x400?text=Consulta+General',
          price: 50.00
        },
        {
          id: 2,
          name: 'Examen de Laboratorio',
          description: 'Análisis de sangre completo para detectar problemas de salud',
          image: 'https://placehold.co/600x400?text=Laboratorio',
          price: 80.00
        },
        {
          id: 3,
          name: 'Radiografía',
          description: 'Imágenes por rayos X para diagnóstico de problemas óseos',
          image: 'https://placehold.co/600x400?text=Radiografía',
          price: 120.00
        }
      ];
      
      // Simulamos un retraso de red
      setTimeout(() => {
        setServices(mockServices);
        setLoading(false);
      }, 800);
    } catch {
      setError('Error al cargar los servicios. Por favor, intente nuevamente.');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando servicios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger my-4" role="alert">
        {error}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="alert alert-info my-4" role="alert">
        No hay servicios disponibles en este momento.
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Nuestros Servicios</h2>
      <div className="row">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
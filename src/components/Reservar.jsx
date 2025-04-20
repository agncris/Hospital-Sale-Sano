import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import AppointmentForm from './AppointmentForm';

const Reservar = () => {
  const [medicos, setMedicos] = useState([]);
  const [reservaExitosa, setReservaExitosa] = useState(false);
  const [citaReservada, setCitaReservada] = useState(null);

  useEffect(() => {
    // Simulate fetching data from an API or database
    const fetchMedicos = async () => {
      const medicosData = [
        {
          nombre: "Dr. Benjamín Soto",
          especialidad: "Pediatra",
          descripcion: "Graduado en la universidad de La Salud, especialista en niños.",
          experiencia: 6,
          contacto: {
            telefono: "+56 9 1234 5678",
            email: "benjamin.soto@hospital.cl"
          },
          disponibilidad: {
            lunes: "09:00 - 13:00",
            martes: "14:00 - 18:00",
            viernes: "09:00 - 13:00"
          },
          consultas: [
            { dia: "Lunes", horas: 5 },
            { dia: "Miércoles", horas: 4 },
            { dia: "Viernes", horas: 8 }
          ],
          imagen: "https://www.sonicseo.com/wp-content/uploads/2020/07/surgeon-768x768.jpg"
        },
        {
          nombre: "Dr. Fermín Fernández",
          especialidad: "Psiquiatra",
          descripcion: "Especialista en hacerle olvidar sus problemas.",
          experiencia: 2,
          contacto: {
            telefono: "+56 9 8765 4321",
            email: "fermin.fernandez@hospital.cl"
          },
          disponibilidad: {
            martes: "09:00 - 12:00",
            jueves: "14:00 - 18:00"
          },
          consultas: [
            { dia: "Lunes", horas: 7 },
            { dia: "Miércoles", horas: 2 },
            { dia: "Viernes", horas: 6 }
          ],
          imagen: "https://pngimg.com/uploads/doctor/doctor_PNG16041.png"
        },
        {
          nombre: "Dr. Zenior",
          especialidad: "Oftalmólogo",
          descripcion: "Especialista en problemas de visión.",
          experiencia: 50,
          contacto: {
            telefono: "+56 9 5555 5555",
            email: "zenior.vision@hospital.cl"
          },
          disponibilidad: {
            lunes: "10:00 - 14:00",
            jueves: "08:00 - 12:00",
            viernes: "12:00 - 16:00"
          },
          consultas: [
            { dia: "Lunes", horas: 9 },
            { dia: "Miércoles", horas: 2 },
            { dia: "Viernes", horas: 2 }
          ],
          imagen: "https://www.stockvault.net/data/2015/09/01/177580/preview16.jpg"
        }
      ];
      setMedicos(medicosData);
    };

    fetchMedicos();
  }, []);

  const handleFormSubmit = (appointment) => {
    console.log('Appointment booked:', appointment);
    // Guardar la cita reservada en el estado y mostrar confirmación
    setReservaExitosa(true);
    setCitaReservada(appointment);
    
    // Opcional: guardar en localStorage 
    try {
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const newAppointment = {
        ...appointment,
        id: Date.now(),
        estado: 'Pendiente'
      };
      existingAppointments.push(newAppointment);
      localStorage.setItem('appointments', JSON.stringify(existingAppointments));
    } catch (error) {
      console.error('Error al guardar la cita:', error);
    }
  };

  // Si la reserva fue exitosa, mostrar mensaje de confirmación
  if (reservaExitosa && citaReservada) {
    return (
      <div className="container my-5">
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">¡Reserva Exitosa!</h4>
          <p>Tu cita ha sido reservada correctamente con los siguientes detalles:</p>
          <hr />
          <p className="mb-0"><strong>Paciente:</strong> {citaReservada.name}</p>
          <p className="mb-0"><strong>Doctor:</strong> {citaReservada.doctor}</p>
          <p className="mb-0"><strong>Servicio:</strong> {citaReservada.service}</p>
          <p className="mb-0"><strong>Fecha:</strong> {citaReservada.date}</p>
          <hr />
          <p>Te enviaremos un correo con la confirmación y los detalles de tu cita.</p>
          <button 
            className="btn btn-primary mt-3" 
            onClick={() => {
              setReservaExitosa(false);
              setCitaReservada(null);
            }}
          >
            Reservar otra cita
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Reservar una hora</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <AppointmentForm doctors={medicos} onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Reservar;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import { Link } from 'react-router-dom';
import ServiceList from './ServiceList';

const Home = () => {
  const featuredServices = [
    { id: 1, name: "Pediatría" },
    { id: 2, name: "Psiquiatría" },
    { id: 3, name: "Oftalmología" }
  ];

  return (
    <div className="container-fluid">
      <section className="hero text-center py-5">
        <div className="container">
          <h1 className="display-4">Bienvenidos al Hospital Sale Sano</h1>
          <p className="lead">Nuestra misión y visión es: <i>"Si entras malo sales sano"</i></p>
          <a href="#servicios" className="btn btn-primary btn-lg mt-3">Ver Servicios</a>
          <button id="btnAsistente" className="btn btn-primary btn-lg mt-3">Iniciar asistente</button>
        </div>
      </section>

      <section id="servicios" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Servicios Médicos</h2>
          <div className="row">
            {featuredServices.map(service => (
              <React.Fragment key={service.id}>
                <div className="col-12 col-md-4 text-center mb-4">
                  <div className="card border-0 shadow">
                    <div className="card-body">
                      <h3 className="card-title">{service.name}</h3>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
         
          <div className="row">
            <div className="col-12 col-md-4 text-center">
              <div className="card border-0 shadow">
                <img src="https://cdn0.iconfinder.com/data/icons/stop-virus-outline-iconset-2/128/ic_doctor_attention-512.png" className="card-img-top img-fluid" alt="Consultas Médicas" />
                <div className="card-body">
                  <h3 className="card-title">Consultas</h3>
                  <p className="card-text">Agende una hora de consulta médica.</p>
                  <Link to="/reservar" className="btn btn-outline-primary">Agendar</Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 text-center">
              <div className="card border-0 shadow">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficon-library.com%2Fimages%2Furgency-icon%2Furgency-icon-11.jpg&f=1&nofb=1&ipt=22169b033a1f71f1ea47c7a06eba44456dcb2731c566301f3f2d26cd6d1b160c&ipo=images" className="card-img-top img-fluid" alt="Urgencias" />
                <div className="card-body">
                  <h3 className="card-title">Urgencias</h3>
                  <p className="card-text">Atención rápida por urgencia.</p>
                  <Link to="/reservar" className="btn btn-outline-primary">Ir</Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 text-center">
              <div className="card border-0 shadow">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F015%2F659%2F480%2Foriginal%2Fhealth-checkup-icon-outline-medical-care-vector.jpg&f=1&nofb=1&ipt=07ddb000522f0b148f65fbb702395b3c3b7d27e09e990ed767d1a3f4172de8f7&ipo=images" className="card-img-top img-fluid" alt="Especialidades" />
                <div className="card-body">
                  <h3 className="card-title">Especialidades</h3>
                  <p className="card-text">Agende una hora de especialidades médicas.</p>
                  <Link to="/reservar" className="btn btn-outline-primary">Agendar</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="informacion" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Información del Hospital</h2>
          <p className="text-center">El Hospital Sale Sano se dedica a proporcionar atención médica de alta calidad a todos nuestros pacientes. Contamos con un equipo de profesionales altamente capacitados y tecnología de punta para asegurar que salgas sano.</p>
        </div>
      </section>

      <section id="testimonios" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Testimonios de pacientes</h2>
          <div className="row">
            <div className="col-12 col-md-6">
              <blockquote className="blockquote bg-light p-3 shadow">
                <p className="mb-10">"Tuve una excelente experiencia, efectivamente salí sano"</p>
                <footer className="blockquote-footer">Jhon Dalton</footer>
              </blockquote>
            </div>
            <div className="col-12 col-md-6">
              <blockquote className="blockquote bg-light p-3 shadow">
                <p className="mb-10">"Pensé que no iba a lograr mejorarme, pero los médicos son excelentes"</p>
                <footer className="blockquote-footer">Jhony Walker</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
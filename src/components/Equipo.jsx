import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import MedicosList from './MedicosList';

function Equipo() {
  return (
    <div>
      <main className="container-fluid">
        <section className="container my-5">
          <h2 className="text-center mb-4">Conoce a nuestro staff especialista</h2>
          <p className="text-center">Contamos con especialistas a tu servicio</p>
        </section>

        <section className="container my-5">
          <MedicosList />
          <div id="doctor-info"></div>
        </section>
      </main>
    </div>
  );
}

export default Equipo;

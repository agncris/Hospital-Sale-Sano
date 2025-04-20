import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="container-fluid py-3 bg-primary text-white">
      <div className="row align-items-center">
        <div className="col-6 col-lg-2">
          <Link to="/" className="header__logo">
            <img src="https://clarkebenefits.com/wp-content/uploads/2018/07/hospital-icon.png" alt="Logo del Hospital" width="50" height="50" />
          </Link>
        </div>
        <div className="col-12 col-lg-8">
          <ul className="nav justify-content-center align-items-center">
            {isAuthenticated && user && (
              <li className="nav-item">
                <span className="nav-link text-white">
                  ¡Bienvenido, {user.username}! ({user.role})
                </span>
              </li>
            )}
            <li className="nav-item"><Link to="/" className="nav-link text-white">Inicio</Link></li>
            <li className="nav-item"><Link to="/equipo" className="nav-link text-white">Equipo</Link></li>
            <li className="nav-item"><Link to="/contacto" className="nav-link text-white">Contacto</Link></li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to={`/${user?.role}/dashboard`} className="nav-link text-white">
                    Mi Panel
                  </Link>
                </li>
                <li className="nav-item"><Link to="/doctors" className="nav-link text-white">Doctores</Link></li>
                <li className="nav-item"><Link to="/add-doctor" className="nav-link text-white">Agregar Doctor</Link></li>
                <li className="nav-item"><button className="nav-link text-white btn btn-link" onClick={handleLogout}>Cerrar Sesión</button></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link to="/login" className="nav-link text-white">Iniciar Sesión</Link></li>
                <li className="nav-item"><Link to="/register" className="nav-link text-white">Registrarse</Link></li>
              </>
            )}
          </ul>
        </div>
        <div className="col-6 col-lg-2 text-end">
          <Link to="/reservar" className="btn btn-secondary">Reservar una hora</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

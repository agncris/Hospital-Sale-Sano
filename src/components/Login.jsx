import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FormInput from './FormInput';
import PropTypes from 'prop-types';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localStorageStatus, setLocalStorageStatus] = useState(null);

  // Si venimos del registro, usar el email registrado
  useEffect(() => {
    if (location.state?.registeredEmail) {
      setEmail(location.state.registeredEmail);
      console.log('Email obtenido de registro:', location.state.registeredEmail);
    }
    
    // Verificar estado de localStorage
    try {
      const mockUsers = localStorage.getItem('mockUsers');
      if (mockUsers) {
        const parsed = JSON.parse(mockUsers);
        setLocalStorageStatus(`Usuarios en localStorage: ${Object.keys(parsed).join(', ')}`);
        console.log('Usuarios disponibles:', Object.keys(parsed));
      } else {
        setLocalStorageStatus('No hay usuarios guardados en localStorage');
        console.log('No hay usuarios en localStorage');
      }
    } catch (err) {
      console.error('Error verificando localStorage:', err);
      setLocalStorageStatus('Error verificando usuarios en localStorage');
    }
  }, [location]);

  useEffect(() => {
    // Cleanup effect ejecutado solo al desmontar
    return () => {
      // Cleanup code here if needed
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('Intentando iniciar sesión con:', email);
    
    try {
      // Verificar estado de localStorage antes del login
      try {
        const mockUsers = localStorage.getItem('mockUsers');
        console.log('Estado de localStorage antes del login:', mockUsers);
      } catch (err) {
        console.error('Error verificando localStorage:', err);
      }
      
      const userData = await login({ email, password });
      console.log('Login exitoso:', userData);
      navigate('/');
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {localStorageStatus && (
        <div className="alert alert-info">
          <small>{localStorageStatus}</small>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <FormInput
          id="email"
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
        
        <FormInput
          id="password"
          label="Contraseña"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting}
          autoComplete="current-password"
        />
        
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  // Add any necessary prop types here
};

Login.defaultProps = {
  // Add any necessary default props here
};

export default Login;

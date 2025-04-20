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
  // Estado para almacenar las credenciales de prueba
  const [mockCredentials, setMockCredentials] = useState(null);

  // Si venimos del registro, usar el email registrado
  useEffect(() => {
    if (location.state?.registeredEmail) {
      setEmail(location.state.registeredEmail);
      console.log('Email obtenido de registro:', location.state.registeredEmail);
    }
    
    // Verificar estado de localStorage y extraer credenciales
    try {
      const mockUsersRaw = localStorage.getItem('mockUsers');
      if (mockUsersRaw) {
        const parsedUsers = JSON.parse(mockUsersRaw);
        // Transformar los datos para mostrar email y contraseña
        const credentialsArray = Object.entries(parsedUsers).map(([email, userData]) => ({
          email,
          // Asumiendo que la contraseña se guarda directamente en el objeto del usuario
          // ¡Asegúrate de que esto coincida con cómo guardas los datos en register! 
          // Si la contraseña está hasheada o encriptada, no podrás mostrarla directamente.
          password: userData.password // Cambia esto si la estructura es diferente
        }));
        setMockCredentials(credentialsArray);
        console.log('Credenciales de prueba cargadas:', credentialsArray);
      } else {
        console.log('No hay usuarios guardados en localStorage');
      }
    } catch (err) {
      console.error('Error verificando/parseando localStorage:', err);
      setMockCredentials([]); // Indicar que hubo un error o no hay datos
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
      
      {/* Sección para mostrar credenciales de prueba */}
      {mockCredentials && mockCredentials.length > 0 && (
        <div className="alert alert-warning mt-3">
          <h5 className="alert-heading">Credenciales de Prueba</h5>
          <small>
            <ul className="list-unstyled mb-0">
              {mockCredentials.map((cred, index) => (
                <li key={index}>
                  <strong>Email:</strong> {cred.email} | <strong>Password:</strong> {cred.password}
                </li>
              ))}
            </ul>
          </small>
        </div>
      )}
      {mockCredentials === null && (
          <div className="alert alert-info mt-3"><small>Cargando credenciales...</small></div>
      )}
      {mockCredentials && mockCredentials.length === 0 && (
          <div className="alert alert-secondary mt-3"><small>No se encontraron credenciales de prueba en localStorage.</small></div>
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

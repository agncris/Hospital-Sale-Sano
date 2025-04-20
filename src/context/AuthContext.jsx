import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { sanitizeString } from '../utils/sanitize';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

// Mock users database
const MOCK_USERS = {
  'admin@hospital.cl': {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    permissions: ['manage_doctors', 'manage_patients', 'view_reports']
  },
  'doctor@hospital.cl': {
    username: 'doctor',
    password: 'doctor123',
    role: 'doctor',
    permissions: ['view_patients', 'manage_appointments']
  },
  'staff@hospital.cl': {
    username: 'staff',
    password: 'staff123',
    role: 'staff',
    permissions: ['view_appointments', 'manage_basic_info']
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jwtToken, setJwtToken] = useState(() => {
    const token = localStorage.getItem('jwtToken');
    return token || null;
  });
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [preferences, setPreferences] = useState(() => {
    const storedPreferences = localStorage.getItem('userPreferences');
    return storedPreferences ? JSON.parse(storedPreferences) : {};
  });
  
  // Inicializar mockUsers con datos del localStorage o valores por defecto
  const [mockUsers, setMockUsers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem('mockUsers');
      if (savedUsers) {
        const parsedUsers = JSON.parse(savedUsers);
        console.log('Usuarios cargados del localStorage:', Object.keys(parsedUsers));
        return parsedUsers;
      }
      console.log('Usando usuarios predeterminados');
      return MOCK_USERS;
    } catch (err) {
      console.error('Error al cargar usuarios del localStorage:', err);
      return MOCK_USERS;
    }
  });

  // Efecto para guardar usuarios en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
      console.log('Usuarios guardados en localStorage:', Object.keys(mockUsers));
    } catch (err) {
      console.error('Error al guardar usuarios en localStorage:', err);
    }
  }, [mockUsers]);

  const sanitizeInput = useCallback((input) => {
    return sanitizeString ? sanitizeString(input) : input;
  }, []);

  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error('Error al decodificar token:', err);
      return null;
    }
  };

  const isTokenValid = useCallback(() => {
    if (!jwtToken) return false;
    try {
      const decodedToken = decodeToken(jwtToken);
      return decodedToken && decodedToken.exp * 1000 > Date.now();
    } catch (err) {
      console.error('Error al validar token:', err);
      return false;
    }
  }, [jwtToken]);

  // Función para registrar nuevos usuarios
  const register = useCallback(async (userData) => {
    try {
      const sanitizedData = {
        username: sanitizeInput(userData.username),
        email: sanitizeInput(userData.email),
        password: sanitizeInput(userData.password),
      };

      console.log('Intentando registrar usuario:', sanitizedData.email);
      console.log('Estado actual de usuarios:', Object.keys(mockUsers));

      // Verificar si el correo ya existe
      if (mockUsers[sanitizedData.email]) {
        console.log('El email ya está registrado');
        throw new Error('Este correo electrónico ya está registrado');
      }

      // Crear nuevo usuario con rol de paciente por defecto
      const newUser = {
        username: sanitizedData.username,
        password: sanitizedData.password,
        role: 'patient', // Rol por defecto para nuevos usuarios
        permissions: ['view_appointments'] // Permisos básicos
      };

      // Añadir usuario a la base de datos simulada
      const updatedUsers = {
        ...mockUsers,
        [sanitizedData.email]: newUser
      };
      
      console.log('Nuevo usuario registrado:', sanitizedData.email);
      console.log('Lista actualizada de usuarios:', Object.keys(updatedUsers));
      
      // Actualizar estado
      setMockUsers(updatedUsers);
      
      return true;
    } catch (err) {
      console.error('Error de registro:', err);
      setError(err.message);
      throw err;
    }
  }, [mockUsers, sanitizeInput]);

  const login = useCallback(async (credentials) => {
    try {
      const sanitizedCredentials = {
        email: sanitizeInput(credentials.email),
        password: sanitizeInput(credentials.password),
      };

      console.log('Intentando iniciar sesión con:', sanitizedCredentials.email);
      console.log('Usuarios disponibles:', Object.keys(mockUsers));
      
      // Obtener usuarios directamente del localStorage para asegurar datos actualizados
      try {
        const savedUsers = localStorage.getItem('mockUsers');
        if (savedUsers) {
          const parsedUsers = JSON.parse(savedUsers);
          console.log('Usuarios obtenidos directamente de localStorage:', Object.keys(parsedUsers));
          
          // Verificar si el usuario existe en localStorage
          const storedUser = parsedUsers[sanitizedCredentials.email];
          if (storedUser) {
            console.log('Usuario encontrado en localStorage');
            
            // Verificar contraseña
            if (storedUser.password === sanitizedCredentials.password) {
              const userData = {
                username: storedUser.username,
                email: sanitizedCredentials.email,
                role: storedUser.role,
                permissions: storedUser.permissions
              };
              
              console.log('Login exitoso para:', userData.username);
              
              const token = btoa(JSON.stringify({ ...userData, exp: Date.now() + 3600000 }));
              setJwtToken(token);
              setIsAuthenticated(true);
              setUser(userData);
              
              // Guardar token y datos de usuario en localStorage
              localStorage.setItem('jwtToken', token);
              localStorage.setItem('userData', JSON.stringify(userData));
              setError(null);
              
              return userData;
            } else {
              console.log('Contraseña incorrecta (desde localStorage)');
            }
          } else {
            console.log('Usuario no encontrado en localStorage');
          }
        }
      } catch (localStorageErr) {
        console.error('Error al acceder a localStorage:', localStorageErr);
      }
      
      // Si no se encontró en localStorage o hubo error, intenta con el estado
      const stateUser = mockUsers[sanitizedCredentials.email];
      
      if (!stateUser) {
        console.log('Usuario no encontrado en estado');
        throw new Error('Credenciales inválidas');
      }
      
      if (stateUser.password !== sanitizedCredentials.password) {
        console.log('Contraseña incorrecta (desde estado)');
        throw new Error('Credenciales inválidas');
      }

      const userData = {
        username: stateUser.username,
        email: sanitizedCredentials.email,
        role: stateUser.role,
        permissions: stateUser.permissions
      };

      console.log('Login exitoso para:', userData.username);

      const token = btoa(JSON.stringify({ ...userData, exp: Date.now() + 3600000 }));
      setJwtToken(token);
      setIsAuthenticated(true);
      setUser(userData);
      
      // Guardar token y datos de usuario en localStorage
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      setError(null);

      return userData;
    } catch (err) {
      console.error('Error de login:', err);
      setError(err.message);
      throw err;
    }
  }, [mockUsers, sanitizeInput]);

  const logout = useCallback(() => {
    setJwtToken(null);
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (jwtToken) {
      if (!isTokenValid()) {
        console.log('Token inválido, cerrando sesión');
        logout();
      } else {
        setIsAuthenticated(true);
        try {
          const decodedUser = decodeToken(jwtToken);
          setUser(decodedUser);
          console.log('Usuario autenticado:', decodedUser?.username);
        } catch (err) {
          console.error('Error al decodificar token en useEffect:', err);
          logout();
        }
      }
    }
  }, [jwtToken, isTokenValid, logout]);

  // Función para verificar permisos
  const hasPermission = useCallback((permission) => {
    return user?.permissions?.includes(permission) || false;
  }, [user]);

  const updatePreferences = useCallback((newPreferences) => {
    const updatedPreferences = { ...preferences, ...newPreferences };
    setPreferences(updatedPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
  }, [preferences]);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      register,
      jwtToken,
      user,
      hasPermission,
      isTokenValid,
      error,
      preferences,
      updatePreferences
    }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export default AuthContext;

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import { useAuth } from "./AuthContext";
import CryptoJS from 'crypto-js';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';

const DoctorContext = createContext();

// Creamos un hook falso que se usará como respaldo si hay error
const useAuthFallback = () => {
  return { jwtToken: null, isTokenValid: () => false };
};

export const DoctorProvider = ({ children }) => {
  // Usamos el hook en el nivel superior para evitar el error de las reglas de los hooks
  const auth = useAuth || useAuthFallback;
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isTokenValid } = auth();
  const [doctors, setDoctors] = useState([]);
  const encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY || 'your-fallback-encryption-key';

  const decryptSensitiveData = useCallback((encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }, [encryptionKey]);

  const { data: fetchedDoctors, loading, error, execute: fetchDoctors } = useApi(api.getDoctors);

  useEffect(() => {
    if (isTokenValid()) {
      fetchDoctors();
    }
  }, [isTokenValid, fetchDoctors]);

  useEffect(() => {
    if (fetchedDoctors) {
      try {
        const decryptedDoctors = fetchedDoctors.map(doctor => ({
          ...doctor,
          contacto: doctor.contacto ? decryptSensitiveData(doctor.contacto) : undefined,
          pacientes: doctor.pacientes ? decryptSensitiveData(doctor.pacientes) : [],
        }));
        setDoctors(decryptedDoctors);
      } catch (decryptionError) {
        console.error("Error decrypting doctor data:", decryptionError);
        setDoctors([]);
      }
    }
  }, [fetchedDoctors, decryptSensitiveData]);

  return (
    <DoctorContext.Provider value={{ doctors, loading, error }}>
      {children}
    </DoctorContext.Provider>
  );
};

DoctorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useDoctors = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctors debe usarse dentro de DoctorProvider');
  }
  return context;
};

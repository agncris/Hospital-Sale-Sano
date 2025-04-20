import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import DOMPurify from 'dompurify';
import CryptoJS from 'crypto-js';

// Crear el contexto
const DoctorContext = createContext();

// Proveedor del contexto
export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jwtToken, isTokenValid } = useAuth();
  const apiKey = 'YOUR_API_KEY_HERE';

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
  };

  const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY || 'your-fallback-encryption-key';

  const encryptSensitiveData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
  };

  const decryptSensitiveData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };

  const fetchDoctors = useCallback(async () => {
    if (!isTokenValid()) {
      setError('Token no válido o expirado');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3001/doctors", {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'x-api-key': apiKey,
        },
      });
      if (!response.ok) {
        throw new Error('Respuesta de red incorrecta');
      }
      const data = await response.json();
      // Decrypt sensitive data after receiving
      const decryptedDoctors = data.map(doctor => ({
        ...doctor,
        nombre: sanitizeInput(doctor.nombre),
        especialidad: sanitizeInput(doctor.especialidad),
        descripcion: sanitizeInput(doctor.descripcion),
        contacto: decryptSensitiveData(doctor.contacto),
        disponibilidad: Object.fromEntries(
          Object.entries(doctor.disponibilidad).map(([key, value]) => [key, sanitizeInput(value)])
        ),
        consultas: doctor.consultas.map(consulta => ({
          dia: sanitizeInput(consulta.dia),
          horas: consulta.horas,
        })),
        imagen: sanitizeInput(doctor.imagen),
        pacientes: doctor.pacientes ? decryptSensitiveData(doctor.pacientes) : [],
      }));
      setDoctors(decryptedDoctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [jwtToken, isTokenValid]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return (
    <DoctorContext.Provider value={{ doctors, setDoctors, loading, error, fetchDoctors }}>
      {children}
    </DoctorContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const useDoctors = () => useContext(DoctorContext);

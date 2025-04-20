import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const { isTokenValid } = useAuth();
  const [appointments, setAppointments] = useState([]);

  const { data: fetchedAppointments, loading: loadingGet, error: errorGet, execute: executeGetAppointments } = useApi(api.getAppointments);
  const { loading: loadingAdd, error: errorAdd, execute: executeAddAppointment } = useApi(api.addAppointment);
  const { loading: loadingDelete, error: errorDelete, execute: executeDeleteAppointment } = useApi(api.deleteAppointment);

  useEffect(() => {
    if (isTokenValid()) {
      executeGetAppointments();
    }
  }, [isTokenValid, executeGetAppointments]);

  useEffect(() => {
    if (fetchedAppointments) {
      setAppointments(fetchedAppointments);
    }
  }, [fetchedAppointments]);

  const addNewAppointment = useCallback(async (appointmentData) => {
    try {
      const newAppointment = await executeAddAppointment(appointmentData);
      if (newAppointment) {
        setAppointments((prev) => [...prev, newAppointment]);
      }
      return newAppointment;
    } catch (err) {
      console.error("Error adding appointment:", err);
      throw err;
    }
  }, [executeAddAppointment]);

  const removeAppointment = useCallback(async (id) => {
    try {
      await executeDeleteAppointment(id);
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    } catch (err) {
      console.error("Error deleting appointment:", err);
      throw err;
    }
  }, [executeDeleteAppointment]);

  const loading = loadingGet || loadingAdd || loadingDelete;
  const error = errorGet || errorAdd || errorDelete;

  return (
    <AppointmentContext.Provider value={{ appointments, addNewAppointment, removeAppointment, loading, error }}>
      {children}
    </AppointmentContext.Provider>
  );
};

AppointmentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};

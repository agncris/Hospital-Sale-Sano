import { Doctor, User, CitaMedica } from '../types/interfaces';

const API_URL = 'http://localhost:3001';

export const api = {
  // Doctors
  getDoctors: async (token: string): Promise<Doctor[]> => {
    const response = await fetch(`${API_URL}/doctors`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Error fetching doctors');
    return response.json();
  },

  addDoctor: async (token: string, doctor: Omit<Doctor, 'id'>): Promise<Doctor> => {
    const response = await fetch(`${API_URL}/doctors`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctor),
    });
    if (!response.ok) throw new Error('Error adding doctor');
    return response.json();
  },

  // Authentication
  login: async (credentials: { email: string; password: string }): Promise<{ token: string; user: User }> => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Invalid credentials');
    return response.json();
  },

  // Appointments (Placeholders - Implement actual API calls)
  getAppointments: async (token: string): Promise<CitaMedica[]> => {
    console.warn('API function getAppointments not implemented yet.');
    // Replace with actual fetch call
    // const response = await fetch(`${API_URL}/appointments`, { headers: { 'Authorization': `Bearer ${token}` } });
    // if (!response.ok) throw new Error('Error fetching appointments');
    // return response.json();
    return Promise.resolve([]); // Return empty array for now
  },

  addAppointment: async (token: string, appointment: Omit<CitaMedica, 'id'>): Promise<CitaMedica> => {
    console.warn('API function addAppointment not implemented yet.');
    // Replace with actual fetch call
    // const response = await fetch(`${API_URL}/appointments`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(appointment) });
    // if (!response.ok) throw new Error('Error adding appointment');
    // return response.json();
    // Simulate adding by returning the appointment with a temporary ID
    return Promise.resolve({ ...appointment, id: Date.now() }); 
  },

  deleteAppointment: async (token: string, id: number): Promise<void> => {
    console.warn(`API function deleteAppointment(${id}) not implemented yet.`);
    // Replace with actual fetch call
    // const response = await fetch(`${API_URL}/appointments/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    // if (!response.ok) throw new Error('Error deleting appointment');
    // return response.json();
    return Promise.resolve(); // Simulate success
  },
};

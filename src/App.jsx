import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import DoctorList from './components/DoctorList';
import DoctorForm from './components/DoctorForm';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './components/Home';
import Equipo from './components/Equipo';
import Contacto from './components/Contacto';
import PatientList from './components/PatientList';
import Appointments from './components/Appointments';
import AdminDashboard from './components/AdminDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import StaffDashboard from './components/StaffDashboard';
import Reservar from './components/Reservar';

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/equipo" element={<Equipo />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/reservar" element={<Reservar />} />
            
            {/* Protected Routes */}
            <Route path="/admin/doctors" element={
              <ProtectedRoute requiredPermissions={['manage_doctors']}>
                <DoctorList />
              </ProtectedRoute>
            } />
            <Route path="/admin/add-doctor" element={
              <ProtectedRoute requiredPermissions={['manage_doctors']}>
                <DoctorForm />
              </ProtectedRoute>
            } />
            <Route path="/doctor/patients" element={
              <ProtectedRoute requiredPermissions={['view_patients']}>
                <PatientList />
              </ProtectedRoute>
            } />
            <Route path="/appointments" element={
              <ProtectedRoute requiredPermissions={['view_appointments', 'manage_appointments']}>
                <Appointments />
              </ProtectedRoute>
            } />
            
            {/* Dashboard Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute requiredPermissions={['manage_doctors']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/doctor/dashboard" element={
              <ProtectedRoute requiredPermissions={['view_patients']}>
                <DoctorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/staff/dashboard" element={
              <ProtectedRoute requiredPermissions={['view_appointments']}>
                <StaffDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;

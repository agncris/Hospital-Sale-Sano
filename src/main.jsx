import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/main.css';
import { AuthProvider } from './context/AuthContext';
import { DoctorProvider } from './context/DoctorContext';
import { AppointmentProvider } from './context/AppointmentContext';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Assume PWA plugin handles registration
import ErrorBoundary from './components/ErrorBoundary.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> // StrictMode can be kept if desired, but React import isn't needed at top level
    <ErrorBoundary>
      <AuthProvider>
        <DoctorProvider>
          <AppointmentProvider>
            <App />
          </AppointmentProvider>
        </DoctorProvider>
      </AuthProvider>
    </ErrorBoundary>
  // </React.StrictMode>
);

// Register service worker - Assume PWA plugin handles this
// serviceWorkerRegistration.register();

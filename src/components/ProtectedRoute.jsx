import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredPermissions = [] }) => {
  const { isAuthenticated, hasPermission } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasAllPermissions = requiredPermissions.every(permission => hasPermission(permission));

  if (!hasAllPermissions) {
    console.warn("User does not have required permissions for this route.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

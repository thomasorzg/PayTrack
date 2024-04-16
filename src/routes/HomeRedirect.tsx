import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomeRedirect = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Redirige a los usuarios basados en su rol
  if (!user) {
    // Si no hay usuario, probablemente aún no se ha cargado la información de autenticación
    return <div>Loading...</div>;
  }

  // Redirecciona según el rol del usuario
  switch (user.role) {
    case 'STUDENT':
      return <Navigate to="/pagosAcademicos" state={{ from: location }} replace />;
    case 'SUPERADMIN':
    case 'ADMIN':
      return <Navigate to="/dashboard" state={{ from: location }} replace />;
    default:
      // Por defecto o en caso de un rol no reconocido, enviar a login o alguna otra página
      return <Navigate to="/login" replace />;
  }
};

export default HomeRedirect;

import { useUserContext } from '../context/user/userContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();
  if (!user) {
    return <Navigate to='/' />;
  }
  return children;
};
export default ProtectedRoute;

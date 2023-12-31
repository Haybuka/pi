
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


const RequireAuth = ({ accountType }) => {

  const { userProfile } = useAuth()
  const location = useLocation();

  const userType = (userProfile) => {
    switch (userProfile?.type) {
      //0 is admin
      //1 is merchant
      case 0:
        return "admin";
      case 1:
        return "merchant";
      default:
        return "";
    }
  };


  return (
    userType(userProfile) === accountType ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
  )
}

export default RequireAuth
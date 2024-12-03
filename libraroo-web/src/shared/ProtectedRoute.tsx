import { Navigate } from "react-router-dom";
//import usersService from "../../users/services/users.service";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return true ? children : <Navigate to="/login" />; // TODO: Implement authentication
};

export default ProtectedRoute;
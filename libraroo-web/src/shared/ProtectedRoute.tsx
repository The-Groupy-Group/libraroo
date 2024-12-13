import { Navigate } from "react-router-dom";
import usersService from "../users/services/users.service";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return usersService.isLoggedIn() ? children : <Navigate to="/login" />;
  //return children;
};

export default ProtectedRoute;
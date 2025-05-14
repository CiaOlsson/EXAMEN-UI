import {Navigate} from "react-router";
import {jwtDecode} from "jwt-decode";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

type JwtPayload = {
  exp: number;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  const decodedToken = jwtDecode<JwtPayload>(token);

  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
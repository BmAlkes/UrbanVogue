import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

// Tipagem dos props esperados
interface ProtectedRouteProps {
  children: ReactNode;
  role?: string;
}

// Tipagem do estado do Redux
interface RootState {
  auth: {
    user: {
      role?: string;
      [key: string]: any;
    } | null;
  };
}

const ProtectedRouted = ({ children, role }: ProtectedRouteProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" replace />;
  }

return children
};

export default ProtectedRouted;

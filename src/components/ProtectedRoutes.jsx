import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRole }) {
    const { isAuthenticated, role } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (allowedRole && !allowedRole.includes(role)) {
        return <Navigate to={`/${role}`} replace />;
    }
    return children;
}
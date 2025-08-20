import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    const userID = localStorage.getItem("userID");
    if (!userID) {
        return <Navigate to="/layout/login" replace />;
    }
    return children;
}; 

export default ProtectedRoute;
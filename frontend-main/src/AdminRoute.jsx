import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("userRole");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (isAuthenticated && role === "admin") {
    return children;
  } else if (isAuthenticated && role !== "admin") {
    return <Navigate to="/unauthorized" />;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminRoute;

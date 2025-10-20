import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export const ProtectedLayout = () => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <p>Loading...</p>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

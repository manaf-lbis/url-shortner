import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import LoadingSpinner from "../components/LoadingSpinner";

export const PublicLayout = () => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <LoadingSpinner />

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

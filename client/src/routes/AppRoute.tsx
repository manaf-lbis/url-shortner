import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import ForgotPasswordPage from "../pages/ForgotPassword";
import DashboardPage from "../pages/Dashboard";
import { ProtectedLayout } from "./ProtectedLayout";
import { PublicLayout } from "./PublicLayout";
import AuthInitializer from "../hooks/AuthInitializer";

export const AppRoute = () => {
  return (

    <AuthInitializer>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </AuthInitializer>
  );
};

import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import ForgotPasswordPage from "../pages/ForgotPassword";


export const AppRoute = ()=>{
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        </Routes>
    )
}
import React from "react";
import { useValidateUserQuery } from "../api/authApi";
import { useNavigate } from "react-router-dom";


export const NavigationGuard = ({ children }: { children: React.ReactNode }) => {

    const navigate = useNavigate()

    const { data } = useValidateUserQuery({},{ skip: localStorage.getItem("isAuthenticated") !== "true" });
    if(data && data.success === true){
        localStorage.setItem("isAuthenticated", "true");
        navigate('/home')
    } else {
        localStorage.setItem("isAuthenticated", "false");
    }




    return <>{children}</>;
}
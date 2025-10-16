import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";


export const AppRoute = ()=>{
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
        </Routes>
    )
}
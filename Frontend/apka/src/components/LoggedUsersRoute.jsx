import React from "react";
import { Navigate } from "react-router-dom";

// Funkcja nadająca dostęp do modułu jedynie użytkownikom zalogoawanym 
export default function LoggedUsersRoute({ children }) {
    const token = !!localStorage.getItem("token");
    const rankID = Number(localStorage.getItem("rankID") || 3);

    return token ? children : <Navigate to="/" replace />;
}
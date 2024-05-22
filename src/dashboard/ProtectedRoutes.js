import { Navigate, Outlet, Route, } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const ProtectedRoutes = () => {
    const {isAuthenticated} = useAuth()

    return(
         isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}
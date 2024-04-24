import React, {useEffect, useState} from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';


const PrivateRoute = () => {

    const { user, refreshToken , logout} = useAuth();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const refresh = async () => {
            try {
                await refreshToken();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user === null) {
            setIsLoading(true);
        } else if (user && user.accessToken) {
            const tokenExp = new Date(jwtDecode(user.accessToken).exp * 1000);
            const now = new Date();

            // Refresh token if it's about to expire
            if (tokenExp - now < 60 * 1000) {
                refresh();
            } else {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, [user, refreshToken, logout]);

    if (isLoading) {
        return (
            <></>
        )
    }

    return user && user.accessToken ?<Outlet /> : <Navigate to="/register" />;
}
export default PrivateRoute;
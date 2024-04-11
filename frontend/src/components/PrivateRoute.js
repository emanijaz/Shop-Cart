import React, {useEffect} from 'react';
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
const jwt = require('jsonwebtoken');
// const crypto = require('crypto');


// // const secretKey = crypto.randomBytes(32).toString('hex');
// const secretKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     const { user } = useAuth();

//     return (
//         <Route
//             {...rest}
//             render={(props) => (user ? <Component {...props} /> : <Navigate to="/login" replace={true} />)}
//         />
//     );
// };

// 


const PrivateRoute = () => {

    const { user, logout, refreshToken } = useAuth();

    useEffect(() => {
        const refresh = async () => {
        try {
            await refreshToken();
        } catch (error) {
            console.error(error);
            logout();
        }
        };

        if (user && user.accessToken) {
        const tokenExp = new Date(jwt.decode(user.accessToken).exp * 1000);
        const now = new Date();

        // Refresh token if it's about to expire
        if (tokenExp - now < 60 * 1000) {
            refresh();
        }
        }
    }, [user, refreshToken, logout]);

    return user && user.accessToken ?<Outlet /> : <Navigate to="/register" />;
}
export default PrivateRoute;
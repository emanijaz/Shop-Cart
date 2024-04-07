import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
            const response = await axios.get("http://localhost:5000/users/user/", {
                withCredentials: true,
            });
            console.log('fetch user in auth context: ', response.data)
            setUser(response.data);
            } catch (error) {
            console.error(error);
            } finally {
            setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
        const response = await axios.post("http://localhost:5000/users/login/", { email, password });
        console.log('response: ', response)
        setUser(response.data);
        } catch (error) {
        console.error(error);
        }
    };

    const logout = async () => {
        try {
        await axios.post("http://localhost:5000/users/logout/", {}, { withCredentials: true });
        setUser(null);
        } catch (error) {
        console.error(error);
        }
    };
    const refreshToken = async () => {
        try {
            const response = await axios.post('http://localhost:5000/users/refresh/', { refreshToken: user.refreshToken });
            setUser((prevUser) => ({ ...prevUser, accessToken: response.data.accessToken }));
        } catch (error) {
                console.error(error);
                setUser(null);
        }
    };
    

    useEffect(() => {
        const interval = setInterval(() => {
          refreshToken();
        }, 5 * 60 * 1000); // Refresh every 5 minutes
    
        return () => clearInterval(interval);
      }, [user]);

    const contextValue = {
        user,
        login,
        logout,
        refreshToken
    };

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

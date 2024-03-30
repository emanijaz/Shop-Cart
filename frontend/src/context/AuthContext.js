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
        setUser(response.data);
        } catch (error) {
        console.error(error);
        }
    };

    const logout = async () => {
        try {
        await axios.post("/api/logout", {}, { withCredentials: true });
        setUser(null);
        } catch (error) {
        console.error(error);
        }
    };

    const contextValue = {
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

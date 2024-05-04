import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log('fetching user in auth provider')
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');

                console.log("access token in auth context: ", accessToken)
                if (accessToken) {
                    const response = await axios.get("http://localhost:5000/users/user/", {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        },
                        withCredentials: true,
                    });
                    console.log(response)
                    setUser({ accessToken: accessToken, refreshToken: refreshToken });
                } else {
                    console.log('Access token not available');
                    navigate('/register');
                }
            } catch (error) {
                console.error(error);
                navigate('/register');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const register = async (email, password, username) => {
        try {
            const response = await axios.post("http://localhost:5000/users/register/", { email, password, username });
            if(response.status === 500 || response.status === false){
                setUser(null);
                return false;
            }
            else if (response.status !== 201) {
                console.error(`Request failed with status ${response.status}`);
                return false;
            }
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setUser(response.data);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:5000/users/login/", { email, password });
            if(response.status === 401 || response.status === false){
                setUser(null);
                return false;
            }
            else if (response.status !== 200) {
                console.error(`Request failed with status ${response.status}`);
                return false;
            }
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setUser(response.data);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    const googleLogin = async (googleData) => {
        try {
            const response = await axios.post("http://localhost:5000/users/google-login/", {
                token: googleData.credential
            });
            if (response.status !== 200) {
                setUser(null);
                console.error(`Request failed with status ${response.status}`);
                return false;
            }
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setUser(response.data);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const logout = async () => {
        try {
        await axios.post("http://localhost:5000/users/logout/", {}, { withCredentials: true });
        localStorage.setItem('accessToken', null);
        localStorage.setItem('refreshToken', null);
        setUser(null);
        } catch (error) {
        console.error(error);
        }
    };
    const refreshToken = async () => {
        try {
            console.log('in refresh auth context')
            const response = await axios.post('http://localhost:5000/users/refresh/', { refreshToken: user.refreshToken });
            localStorage.setItem('accessToken', response.data.accessToken);
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
        googleLogin,
        register,
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

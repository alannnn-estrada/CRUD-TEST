import React, { createContext, useContext, useEffect, useState } from "react";
import instance from "./api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(); // id
    const [userName, setUserName] = useState(); // username
    const [message, setMessage] = useState(); // message
    const [password, setPassword] = useState(); // password

    useEffect(() => {
        const userId = localStorage.getItem("user");
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        if (userId && username && password) {
            setUser(userId);
            setUserName(username);
            setPassword(password);
        }
    }, []);

    const setAuth = (data) => {
        setUser(data[0].id);
        setUserName(data[0].username);
        setPassword(data[0].password);
        localStorage.setItem("user", data[0].id);
        localStorage.setItem("username", data[0].username);
        localStorage.setItem("password", data[0].password);
    };

    const login = ({ username, password }) => {
        instance
            .post("/post/login", { username, password })
            .then((response) => {
                setAuth(response.data.result);
                navigate("/dashboard", { replace: true });
            })
            .catch((error) => {
                setMessage(error.response.data.message);
            });
    };

    const register = ({ username, password }) => {
        instance
            .post("/post/register", { username, password })
            .then((response) => {
                setAuth(response.data.result);
                navigate("/dashboard", { replace: true });
            })
            .catch((error) => {
                setMessage(error.response.data.message);
                console.log(error)
            });

    };

    const logout = () => {
        setUser(null);
        setUserName(null);
        setPassword(null);
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        navigate("/", { replace: true });
        document.body.style.backgroundColor = "#fff";
        document.body.style.color = "#000";
    };

    const contextData = {
        user,
        userName,
        password,
        login,
        register,
        logout,
        message,
        setMessage,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
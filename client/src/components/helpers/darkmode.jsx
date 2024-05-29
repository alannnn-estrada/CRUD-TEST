import React, { useState, createContext, useContext, useEffect } from "react";
const DarkModeContext = createContext();

export function DarkMode({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const darkMode = localStorage.getItem("darkMode");
        if (darkMode) {
            setDarkMode(JSON.parse(darkMode));
        }
        console.log("darkModeStorage", darkMode)
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem("darkMode", JSON.stringify(!darkMode));
        console.log(darkMode)
    }

    const contextData = {
        darkMode,
        setDarkMode,
        toggleDarkMode,
    }

    return (
        <DarkModeContext.Provider value={contextData}>
            {children}
        </DarkModeContext.Provider>
    );
}
export const useDarkMode = () => useContext(DarkModeContext);
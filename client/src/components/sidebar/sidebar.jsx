import { useState } from "react";
import { FaMoon, FaSun, FaTable, FaTimes } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";
import { BiSolidLogOut } from "react-icons/bi";
import "../sidebar/sidebar.css";
import { useAuth } from "../helpers/API/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../helpers/darkmode";

export const Sidebar = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const navItems = [
        {
            category: "titles",
            label: "Tablas",
        },
        {
            label: "tabla1",
            icon: <FaTable />,
        },
        {
            label: "tabla2",
            icon: <FaTable />,
        },
        {
            label: "tabla3",
            icon: <FaTable />,
        },
        {
            label: "tabla4",
            icon: <FaTable />,
        },
        {
            label: "tabla5",
            icon: <FaTable />,
        },
        {
            category: "titles",
            label: "Opciones",
        },
        {
            label: `Modo ${darkMode ? "claro" : "oscuro"}`,
            icon: darkMode ? <FaSun /> : <FaMoon />
        },
        {
            label: "Cerrar sesión",
            icon: <BiSolidLogOut />,
        },
    ];

    const handleButton = (item) => {
        if (item === "Cerrar sesión") {
            logout();
        } else if (item === `Modo ${darkMode ? "claro" : "oscuro"}`) {
            toggleDarkMode();
        } else {
            navigate(`/dashboard?table=${item}`);
        }
    }

    return (
        <nav className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-inner">
                <header className="sidebar-header">
                    <button
                        type="button"
                        className="sidebar-burger"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="material-symbols-outlined" title={isOpen ? "Cerrar" : "Abrir"}>
                            {isOpen ? <FaTimes size={22} /> : <HiLogout size={22} />}
                        </span>
                    </button>
                    <Link to="/dashboard" className="sidebar-logo" style={{ textDecoration: "none" }}>Enterprise Projects Test</Link>
                </header>
                <nav className="sidebar-menu">
                    {navItems.map((item, index) => (
                        <div key={index} className="sidebar-item">
                            {item.category === 'titles' ? (
                                <span className={`sidebar-title ${isOpen ? "open-title" : ""}`}>{item.label}</span>
                            ) : (
                                <button
                                    type="button"
                                    className="sidebar-button"
                                    onClick={() => handleButton(item.label)}
                                >
                                    <div className="sidebar-icon">
                                        <span className="material-symbols-outlined" title={item.label}>{item.icon}</span>
                                    </div>
                                    <p className="sidebar-text">{item.label}</p>
                                </button>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </nav>
    )
}
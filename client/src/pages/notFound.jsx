import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../components/helpers/darkmode';
import { useAuth } from '../components/helpers/API/auth';

export function NotFound() {
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleReturn, setIsVisibleReturn] = useState(false);
    const { darkMode } = useDarkMode();
    const { userName } = useAuth();

    useEffect(() => {
        document.title = '404 - Not Found :(';
        const targetMessage = '404 - Not Found.\nLa página que estás buscando no existe :(';
        let currentSymbol = '|';

        const typingEffect = () => {
            setIsVisible(true);
            for (let i = 0; i <= targetMessage.length; i++) {
                setTimeout(() => {
                    if (i === targetMessage.length) {
                        setMessage(targetMessage);
                        setIsVisibleReturn(true);
                    } else {
                        setMessage(targetMessage.slice(0, i) + currentSymbol);
                    }
                }, i * 100);
            }
        };
        typingEffect();
    }, []);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: darkMode ? '#343a40' : '#f8f9fa',
            overflow: 'hidden', // Añadido overflow aquí
        },
        content: {
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
        },
        heading: {
            fontSize: '3rem',
            marginBottom: '20px',
            color: darkMode ? '#f8f9fa' : '#343a40',
            whiteSpace: 'pre-line',
        },
        containerReturn: {
            opacity: isVisibleReturn ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
        },
        link: {
            color: "#3d7ae3",
            textDecoration: "none",
        }
    };

    return (
        <>
            <div style={styles.container}>
                <div style={styles.content}>
                    <h1 style={styles.heading}>{message}</h1>
                </div>
                <div style={styles.containerReturn}>
                    <h2 style={{ color: darkMode ? '#f8f9fa' : '#343a40' }}>Puedes volver a la página de inicio haciendo click <a href={userName ? "/dashboard" : "/"} style={styles.link}>aqui</a>.</h2>
                </div>
            </div>
        </>
    );
}

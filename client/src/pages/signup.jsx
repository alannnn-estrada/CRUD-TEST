import { useEffect, useState } from "react";
import { useAuth } from "../components/helpers/API/auth";
import { Link } from "react-router-dom";
import { Header } from "./header";

export function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messageUsername, setMessageUsername] = useState(false);
    const [messagePassword, setMessagePassword] = useState(false);
    const { register, message, setMessage } = useAuth();
    const handleLogin = () => {
        if (username === "" || password === "") setMessageUsername(true);
        if (username === "") setMessageUsername(true);
        if (password === "") setMessagePassword(true);
        if (username !== "" && password !== "") {
            register({ username, password });
            setMessageUsername(false);
            setMessagePassword(false);
            setMessage();
        }
    }
    const handleUsername = (event) => {
        setUsername(event.target.value);
        setMessageUsername(false);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
        setMessagePassword(false);
    }
    useEffect(() => {
        setMessageUsername(false);
        setMessagePassword(false);
        setMessage();
        document.title = "Signup";
    }, []);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        formContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            margin: '100px',
            padding: '100px',
            border: '1px solid #ccc',
            borderRadius: '3px',
            backgroundColor: "#71ffd4"
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px',
        },
        input: {
            margin: '10px',
            padding: '5px',
            width: '95%',
            border: '1px solid #ccc',
            borderRadius: '3px',
        },
        button: {
            width: '85%',
        }
    };
    return (
        <>
            <Header />
            <div style={styles.container}>
                <div style={styles.formContainer}>
                    <h1 style={{ textAlign: "center" }}>Signup</h1>
                    <p style={{ textAlign: "center" }}>Ingresa tus datos para registrarte en nuestro servicio</p>
                    <form style={styles.container}>
                        <input style={styles.input} type="text" placeholder="Usuario" onChange={handleUsername} />
                        <p style={{ color: "red", display: messageUsername ? "block" : "none" }}>Usuario incorrecto o no hay usuario</p>
                        <input style={styles.input} type="password" placeholder="Contraseña" value={password} onChange={handlePassword} />
                        <p style={{ color: "red", display: messagePassword ? "block" : "none" }}>Contraseña incorrecta o no hay contraseña</p>
                        <p style={{ color: "red", display: message ? "block" : "none" }}>{message}</p>
                        {/* eslint-disable-next-line */}
                        <p style={{ textAlign: "center" }}>¿Ya tienes cuenta? <Link to="/login" className="link_account">Inicia sesión</Link></p>
                        {/* eslint-disable-next-line */}
                        <a className="button_login" style={styles.button} onClick={handleLogin}>Signup</a>
                    </form>
                </div>
            </div>
        </>
    )
}
import "../assets/styles/buttons.css";
import { Link } from "react-router-dom";
import inventory_image from "../assets/images/inventory.png";
import { useEffect } from "react";
import { Header } from "./header";

export function Home() {
    useEffect(() => {
        document.title = "Home";
    }, []);
    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            margin: "0 10%",
        },
        container_Buttons: {
            display: "flex",
            flexDirection: "row",
            gap: "10px",
        },
    };
    return (
        <>
            <Header />
            <main style={styles.container}>
                <h2>Bienvenido al test del sistema de inventariado con nuestra API :D</h2>
                <img src={inventory_image} alt="Imagen de un inventario" width={"30%"} />
                <p>Para comenzar, necesitas crear una cuenta nueva para utilizar nuestro sitio web. Y si ya tienes una puedes iniciar sesion.</p>
                <div style={styles.container_Buttons}>
                    <Link to="/signup" className="button_singup">Crear cuenta</Link>
                    <Link to="/login" className="button_login">Iniciar sesion</Link>
                </div>
                <p>Una vez iniciada sesion, podras acceder a la lista de productos, crear nuevos productos, editarlos y borrarlos.</p>
                <img src="https://cdn-icons-png.flaticon.com/512/4133/4133524.png" alt="Imagen de un inventario" width={"10%"} />
                <p>Te invitamos a probar nuestro servicio. </p>
                <img src="https://whatemoji.org/wp-content/uploads/2020/07/Winking-Face-Emoji.png" alt="Imagen Gracias Por Nuestra Preferencia" width={"10%"} />
                <p>¡Gracias por tu tiempo!</p>
            </main>
        </>
    )
}
import { driver } from 'driver.js'
import "driver.js/dist/driver.css";
import "../../assets/styles/driver.css";
import { useEffect } from 'react';
export function Init({ username }) {
    const driveObject = driver({
        popoverClass: "driver-popover",
        animate: true,
        allowClose: false,
        doneBtnText: "Terminar",
        closeBtnText: "Cerrar",
        nextBtnText: "Siguiente",
        prevBtnText: "Anterior",
        steps: [
            { element: "body", popover: { title: "Bienvenido", description: "Bienvenido al tour por tu dashboard, durante el recorrido te explicaremos una forma sencilla para interactuar con el. Este tour lo podrás hacer las veces que quieras. ¿Comenzamos?" } },
            { element: ".container", popover: { title: "Contenido", description: "Aquí encontrarás el contenido de la página, en este caso, el contenido del dashboard." } },
            { element: ".header", popover: { title: "Header", description: "Aquí encontrarás el nombre de la página y el botón para abrir el menú." } },
            { element: ".sidebar-menu", popover: { title: "Sidebar", description: "Aquí encontrarás las tablas disponibles para editar. También puedes cambiar el modo de la página y cerrar sesión." } },
            { element: ".startTour", popover: { title: "Tour", description: "Si quieres volver a ver este tour, puedes dar click aquí." } },
            {
                element: "body", popover: { title: "Final", description: "Este es el fin del recorrido. Esperamos que tu estancia aquí sea la mejor posible. ¡Muchas gracias por tu preferencia!" },
                onDeselected: () => {
                    handleFinishTour();
                }
            },
        ],
    });

    const handleStartTour = () => {
        driveObject.drive();
    }
    const handleFinishTour = () => {
        localStorage.setItem("tour", "true");
        driveObject.destroy();
    }

    useEffect(() => {
        const tour = localStorage.getItem("tour");
        if (tour !== "true") {
            handleStartTour();
        }
    }, [])
    return (
        <>
            <h1>Dashboard</h1>
            <p>Bienvenido {username}!</p>
            <p>Este es el dashboard en donde podras encontrar tus productos con alguna imagen</p>
            <p>Podras agregar, borrar y editar los productos</p>
            <p className="startTour">¿No sabes por donde comenzar? <a style={{
                cursor: "pointer",
                backgroundColor: "blue",
                padding: "10px",
                marginTop: "10px",
                color: "white",
                borderRadius: "15px",
            }} onClick={handleStartTour}>Da click aqui</a></p>
        </>
    )
}
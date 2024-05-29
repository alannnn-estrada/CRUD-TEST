import { useState } from "react";
import { useAuth } from "../../helpers/API/auth";
import instance from "../../helpers/API/api";

export function File() {
    const { userName, password } = useAuth();
    const [file, setFile] = useState();
    const [message, setMessage] = useState();
    const [pathImage, setPathImage] = useState();

    const handleFile = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("username", userName);
        formData.append("password", password);
        instance
            .post("/post/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                setMessage(response.data.message);
                const pathImage = response.data.result;
                console.log(pathImage);
            })
            .catch((error) => {
                setMessage(error.response.data.message);
            });
    };

    return (
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <input
                type="file"
                name="file"
                accept="image/*"
                placeholder="Selecciona una imagen"
                onChange={handleFile}
            />
            <button type="submit">Enviar Imagen</button>
            {message && <p>{message}</p>}
            {pathImage && <img src={pathImage} alt="Imagen" />}
        </form>
    );
}

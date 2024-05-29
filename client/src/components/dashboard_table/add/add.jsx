import React, { useRef, useState } from 'react';
import { useAuth } from '../../helpers/API/auth';
import instance from '../../helpers/API/api';

export function AddForm() {
    const [option, setOption] = useState("");
    const [nameProduct, setNameProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState('');
    const [descriptionProduct, setDescriptionProduct] = useState('');
    const [imageProduct, setImageProduct] = useState('');
    const [typeProduct, setTypeProduct] = useState('Bebida');
    const [statusProduct, setStatusProduct] = useState('true'); // Valor por defecto
    const [message, setMessage] = useState(); // message
    const { userName, password } = useAuth();
    const fileInputRef = useRef(null);

    const styles = {
        addForm: {
            maxWidth: '80%',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
        },
        label: {
            display: 'block',
            textAlign: 'left',
        },
        input: {
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
            boxSizing: 'border-box',
        },
        select: {
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
            boxSizing: 'border-box',
        }, button: {
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '10px',
            width: '50%',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
        },
        buttonHover: {
            backgroundColor: '#45a049',
        },
    };

    const handleNombreChange = (event) => {
        setNameProduct(event.target.value);
    };

    const handlePrecioChange = (event) => {
        setPriceProduct(event.target.value);
    };

    const handleDescripcionChange = (event) => {
        setDescriptionProduct(event.target.value);
    };

    const handleImagenChange = (event) => {
        setImageProduct(event.target.value);
    };

    const handleImagenUploadChange = (event) => {
        setImageProduct(event.target.files[0]);
    };

    const handleTipoChange = (event) => {
        setTypeProduct(event.target.value);
    };

    const handleEstadoChange = (event) => {
        setStatusProduct(event.target.value);
    };

    const handleOption = (event) => {
        setOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage(null);

        const send = ({ image }) => {
            instance
                .post("/post/newProduct", { username: userName, password, nameProduct, priceProduct, descriptionProduct, imageProduct: image, typeProduct, statusProduct })
                .then((response) => {
                    setMessage(response.data.message);
                })
                .catch((error) => {
                    setMessage(error.response.data.messageServer);
                });
        }

        if (nameProduct === '' || priceProduct === '' || descriptionProduct === '' || typeProduct === '' || statusProduct === '') return setMessage("Por favor, rellene todos los campos");
        if (option === "upload") {
            const formData = new FormData();
            formData.append("file", imageProduct);
            formData.append("username", userName);
            formData.append("password", password);
            instance
                .post("/post/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    send({ image: response.data.result });
                })
                .catch((error) => {
                    setMessage(error.response.data.message);
                });
        } else if (option === "link") { send({ image: imageProduct }) } else { send({ image: "" }) };
        clearForm();
    };

    const clearForm = () => {
        setNameProduct('');
        setPriceProduct('');
        setDescriptionProduct('');
        setImageProduct('');
        setTypeProduct('Bebida');
        setStatusProduct('true');
        setOption('');
        const clearFileInput = () => {
            // Establecer el valor del input de carga de archivos en null
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        };
        clearFileInput();
    };

    return (
        <form style={styles.addForm} onSubmit={handleSubmit}>
            <label style={{ display: "block", marginBottom: '10px', backgroundColor: "#f5420b", color: "#f3f3f3", padding: "10px", borderRadius: "5px" }}>Añadir Producto</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: "10px" }}>
                <label style={styles.label}>Nombre del producto</label>
                <label style={styles.label}>Precio del producto</label>
                <label style={styles.label}>Descripción del producto</label>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Nombre del producto"
                    value={nameProduct}
                    onChange={handleNombreChange}
                />
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Precio del producto"
                    value={priceProduct}
                    onChange={handlePrecioChange}
                />
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Descripción del producto"
                    value={descriptionProduct}
                    onChange={handleDescripcionChange}
                />
                <label style={styles.label}>Seleccione metodo de imagen</label>
                <label style={styles.label}>Tipo de producto</label>
                <label style={styles.label}>Estado del producto</label>
                <select style={styles.select} value={option} onChange={handleOption}>
                    <option value="" disabled hidden>Seleccionar</option>
                    <option value="upload">Subir Imagen</option>
                    <option value="link">Ingresar Link</option>
                </select>
                <select style={styles.select} value={typeProduct} onChange={handleTipoChange}>
                    <option value="Bebida">Bebida</option>
                    <option value="Comida">Comida</option>
                </select>
                <select style={styles.select} value={statusProduct} onChange={handleEstadoChange}>
                    <option value="true">Activo</option>
                    <option value="false">No Activo</option>
                </select>
                <div style={{ gridColumn: 'span 3', marginBottom: "10px" }}>
                    {option === "upload" ? (
                        <>
                            <label style={{ textAlign: "center" }}>Subir Imagen del producto</label>
                            <input
                                style={{
                                    ...styles.input,
                                    padding: '10px',
                                    background: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                placeholder="Seleccionar imagen"
                                onChange={handleImagenUploadChange}
                            />
                        </>
                    ) : option === "link" ? (
                        <>
                            <label style={{ textAlign: "center" }}>Link de Imagen del producto</label>
                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Ingrese el enlace de la imagen"
                                onChange={handleImagenChange}
                            />
                        </>
                    ) : (
                        <label style={{ textAlign: "center", color: "#f5420b" }}>Seleccione método de imagen</label>
                    )}
                </div>
            </div>
            <button style={styles.button} type="submit">
                Añadir
            </button>
            {message && <p>{message}</p>}
        </form >
    );
}

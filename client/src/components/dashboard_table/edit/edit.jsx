import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/API/auth";
import { useEffect, useRef, useState } from "react";
import instance from "../../helpers/API/api";
import { FaArrowLeft } from "react-icons/fa";
import { Table } from "../table/table";
import { useDarkMode } from "../../helpers/darkmode";

export function EditItemTable({ tableName }) {
    const [option, setOption] = useState("");
    const [nameProduct, setNameProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState('');
    const [descriptionProduct, setDescriptionProduct] = useState('');
    const [imageProduct, setImageProduct] = useState('');
    const [imageProductUpload, setImageProductUpload] = useState('');
    const [typeProduct, setTypeProduct] = useState('');
    const [statusProduct, setStatusProduct] = useState('');
    const [type_image, setTypeImage] = useState(''); // default value for upload image or link image
    const [message, setMessage] = useState('');
    const { userName, password } = useAuth();
    const [information, setInformation] = useState();
    const { darkMode } = useDarkMode();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const editvalue = queryParams.get("edit");
    const productFind = parseInt(editvalue);

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
            fontSize: '14px',
        },
        button: {
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
        option: {
            backgroundColor: darkMode ? "rgb(18, 18, 18)" : "rgb(255, 255, 255)",
            color: darkMode ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",

        }
    };

    useEffect(() => {
        const request = ({ username, password }) => {
            instance
                .post("/post/table", { username, password })
                .then((response) => {
                    const data = response.data.result;
                    const dataArray = Object.values(data);
                    if (Array.isArray(dataArray)) {
                        const productToEdit = dataArray.find((product) => product.id === productFind);
                        if (productToEdit) {
                            setInformation([productToEdit]);
                            setNameProduct(productToEdit.name_products);
                            setPriceProduct(productToEdit.price_for_each);
                            setDescriptionProduct(productToEdit.description);
                            setImageProduct(productToEdit.image);
                            if (productToEdit.image.includes("http://localhost:3001/uploads/")) { setTypeImage("upload") } else { setTypeImage("link") };
                            setTypeProduct(productToEdit.type_of_product);
                            setStatusProduct(productToEdit.status);
                        } else {
                            setMessage('Producto no encontrado');
                        }
                    }
                })
                .catch((error) => {
                    console.log(error.response.data.messageServer);
                });
        };
        request({ username: userName, password: password });
    }, []);

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
        setImageProductUpload(event.target.files[0]);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        const send = ({ image }) => {
            instance.post("/post/editProduct", {
                username: userName,
                password,
                nameProduct,
                priceProduct,
                descriptionProduct,
                imageProduct: image,
                typeProduct,
                statusProduct,
                id: productFind,
            })
                .then((response) => {
                    setMessage(response.data.message);
                    navigate(-1);
                })
                .catch((error) => {
                    setMessage(error.response.data.message);
                });
        }

        if (option === "upload") {
            const formData = new FormData();
            formData.append("file", imageProductUpload);
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
                    console.log(error.response.data.messageServer)
                });
        } else if (option === "link" || option === "") send({ image: imageProduct });
    };


    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <h2>
                <a onClick={handleBack} style={{ color: "#f3f3f3", backgroundColor: "#f5420b", padding: "10px", borderRadius: "5px", cursor: "pointer" }}>
                    <FaArrowLeft style={{ marginRight: "10px", paddingTop: "5px" }} />
                    Regresar
                </a>
            </h2>
            {message === "Producto no encontrado" ? <p>{message}</p> : (
                <>
                    <form style={styles.addForm} onSubmit={handleSubmit} encType="multipart/form-data">
                        <label style={{ display: "block", marginBottom: '10px', backgroundColor: "#f5420b", color: "#f3f3f3", padding: "10px", borderRadius: "5px" }}>Editar Producto</label>
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
                                <option value="upload" style={styles.option}>Subir Imagen {type_image === "upload" && '"Metodo actual"'}</option>
                                <option value="link" style={styles.option}>Ingresar Link {type_image === "link" && '"Metodo actual"'}</option>
                            </select>
                            <select style={styles.select} value={typeProduct} onChange={handleTipoChange}>
                                <option value="Bebida" style={styles.option}>Bebida</option>
                                <option value="Comida" style={styles.option}>Comida</option>
                            </select>
                            <select style={styles.select} value={statusProduct} onChange={handleEstadoChange}>
                                <option value="true" style={styles.option}>Activo</option>
                                <option value="false" style={styles.option}>No Activo</option>
                            </select>
                            <div style={{ gridColumn: 'span 3', marginBottom: "10px" }}>
                                {option === "upload" ? (
                                    <>
                                        <label style={{ textAlign: "center" }}>Subir Imagen del producto</label>
                                        <input
                                            style={styles.input}
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
                                            value={imageProduct}
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
                            Editar
                        </button>
                        {message && <p>{message}</p>}
                    </form >
                    <Table information={information} edit={true} tableName={tableName} />
                </>
            )}
        </>
    )
}
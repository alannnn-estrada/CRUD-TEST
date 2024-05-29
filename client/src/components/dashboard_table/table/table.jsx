import { FaEdit } from "react-icons/fa";
import { useDarkMode } from "../../helpers/darkmode";
import { formatDateTime } from "../../helpers/methodsDate";
import { Link } from "react-router-dom";
import { DeleteButton } from "../delete/delete";
import { useState } from "react";

export function Table({ information, edit, tableName }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterActive, setFilterActive] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const { darkMode } = useDarkMode();
    const styles = {
        table: {
            borderCollapse: "collapse",
            width: "100%",
            margin: "20px 0",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: darkMode ? "0 0 10px rgba(255, 255, 255, 0.1)" : "0 0 10px rgba(0, 0, 0, 0.1)",
            overflowX: "auto",
        },
        table_th: {
            border: `1px solid ${darkMode ? "#555" : "#ddd"}`,
            padding: "12px",
            textAlign: "left",
            background: darkMode ? "#333" : "#f4f4f4",
            fontWeight: "bold",
            color: darkMode ? "#fff" : "#333",
        },
        table_td: {
            border: `1px solid ${darkMode ? "#555" : "#ddd"}`,
            padding: "12px",
            textAlign: "left",
        },
        table_tr: {
            transition: "background-color 0.3s",
        },
        table_tr_hover: {
            ":hover": {
                backgroundColor: darkMode ? "#444" : "#f5f5f5",
            },
        },
        // table items
        table_th_item_table: {
            padding: "15px",
            border: `1px solid ${darkMode ? "#555" : "#ddd"}`,
            textAlign: "center",
            textTransform: "capitalize",
        },
        table_td_item: {
            padding: "15px",
            border: `1px solid ${darkMode ? "#555" : "#ddd"
                }`,
            textAlign: "center",
            textTransform: "capitalize",
        },
        // no data and image
        noData: {
            textAlign: "center",
            padding: "12px",
            fontStyle: "italic",
            color: darkMode ? "#aaa" : "#333",
        },
        image: {
            width: "100px",
            objectFit: "cover",
        }
    };

    const filterData = () => {
        let filteredData = information;
        // Filter for search term
        filteredData = filteredData.filter(item =>
            item.name_products.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filterType) {
            filteredData = filteredData.filter(item => item.type_of_product === filterType);
        }
        if (filterActive) {
            filteredData = filteredData.filter(item => item.status === filterActive);
        }
        if (filterDate) {
            // Convert the date of filterdate to chain into 'yyyy-m-dd' format
            const filterDateYMD = new Date(filterDate);
            const formattedFilterDate = filterDateYMD.toISOString().slice(0, 10);
            // filter by date without the time
            filteredData = filteredData.filter(item => {
                // Convert the item date_of_products_edit to date object
                const itemDate = new Date(item.date_of_products_edit);
                // subtract one day to date of item
                itemDate.setDate(itemDate.getDate() - 1);
                // Convert Item FECH to chain into 'yyyy-mm-dd' format
                const formattedItemDate = itemDate.toISOString().slice(0, 10);
                return formattedItemDate === formattedFilterDate;
            });
        }
        return filteredData;
    };


    return (
        <>
            {edit === true ? null : (
                <div style={{ marginTop: "15px", display: "flex", flexDirection: "row", alignItems: "flex-start", marginLeft: "0" }}>
                    <input
                        style={{
                            marginBottom: "10px",
                            padding: '8px',
                            boxSizing: 'border-box',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        }}
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={{ marginLeft: "10px", padding: '8px', boxSizing: 'border-box', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
                    >
                        <option value="">Todos los Tipos</option>
                        <option value="Bebida">Bebida</option>
                        <option value="Comida">Comida</option>
                    </select>
                    <select
                        value={filterActive}
                        onChange={(e) => setFilterActive(e.target.value)}
                        style={{ marginLeft: "10px", padding: '8px', boxSizing: 'border-box', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
                    >
                        <option value="">Todos los Estados</option>
                        <option value="true">Activo</option>
                        <option value="false">No Activo</option>
                    </select>
                    <input
                        style={{
                            marginLeft: "10px",
                            marginBottom: "10px",
                            padding: '8px',
                            boxSizing: 'border-box',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        }}
                        type="date"
                        placeholder="Buscar..."
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                    <button
                        style={{ marginLeft: "10px", padding: '9px', boxSizing: 'border-box', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: "#e74c3c", color: "#fff", fontWeight: "bold", borderRadius: "5px" }}
                        onClick={() => {
                            setSearchTerm("");
                            setFilterType("");
                            setFilterActive("");
                            setFilterDate("");
                        }}
                    >
                        Borrar Filtros
                    </button>
                </div>
            )}
            <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "500px" }} >
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.table_th}>
                            {edit === true ? null : (
                                <th style={styles.table_th_item_table}>Editar</th>
                            )}
                            <th style={styles.table_th_item_table}>Nombre del Producto</th>
                            <th style={styles.table_th_item_table}>Precio de Cada uno</th>
                            <th style={styles.table_th_item_table}>Descripción</th>
                            <th style={styles.table_th_item_table}>Imagen</th>
                            <th style={styles.table_th_item_table}>Tipo de producto</th>
                            <th style={styles.table_th_item_table}>Estado</th>
                            <th style={styles.table_th_item_table}>Fecha de Ultima Modificación</th>
                            <th style={styles.table_th_item_table}>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(information) ? filterData().map((item, index) => (
                            <tr key={index} style={{ ...styles.table_td, ...styles.table_tr, ...styles.table_tr_hover }}>
                                {edit === true ? null : (
                                    <td style={styles.table_td_item}><Link to={`/dashboard?table=tabla1&edit=${item.id}`}><FaEdit size={20} color="#3498db" /></Link></td>
                                )}
                                <td style={styles.table_td_item}>{item.name_products}</td>
                                <td style={styles.table_td_item}>${item.price_for_each}</td>
                                <td style={styles.table_td_item}>{item.description}</td>
                                <td style={styles.table_td_item}><img src={item.image !== "" ? item.image : "https://cdn3.iconfinder.com/data/icons/graphic-and-web-design/64/PACKAGING_DESIGN-1024.png"} style={styles.image} className="image_table" /></td>
                                <td style={styles.table_td_item}>{item.type_of_product}</td>
                                <td style={styles.table_td_item}>{item.status === "true" ? "Activo" : "No Activo"}</td>
                                <td style={styles.table_td_item}>{item.date_of_products_edit ? formatDateTime(item.date_of_products_edit) : "Producto no Modificado"}</td>
                                <td style={styles.table_td_item}><DeleteButton id={item.id} itemName={item.name_products} tableName={tableName} /></td>
                            </tr>
                        )) : (
                            <tr style={styles.noData}>
                                <td colSpan="9">{information ? information.message : "No hay productos"}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div >
        </>
    );
}
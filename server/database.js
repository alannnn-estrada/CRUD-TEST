import dotenv from "dotenv";
import mysql from "mysql2";
// Configuración de dotenv
dotenv.config();
// Configuración de la conexión a la base de datos
const pool = mysql
    .createPool({
        host: "localhost",
        user: "root",
        password: "mysql",
        database: "crud",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    })
    .promise();

export const newUser = async ({ username, hashedPassword }) => {
    if (username === "" || hashedPassword === "") return false;
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    try {
        const [rows] = await pool.query(query, [username, hashedPassword]);
        return rows;
    } catch (error) {
        console.error("Error al crear un nuevo usuario:", error);
        return false;
    }
};


export const getUser = async ({ username, hashedPassword }) => {
    if (username === "" || hashedPassword === "") return false;
    const query = "SELECT * FROM users WHERE username = ?";
    try {
        const [rows] = await pool.query(query, [username]);
        return rows;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        return false;
    }
};

export const getProducts = async ({ id }) => {
    const query = "SELECT * FROM products WHERE id_user = ?";
    try {
        const [rows] = await pool.query(query, [id]);
        if (rows.length === 0) return { message: "No hay productos para mostrar", result: rows };
        return rows;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        return false;
    }
}

export const newProduct = async ({ id_user, nameProduct, priceProduct, descriptionProduct, imageProduct, typeProduct, statusProduct }) => {
    if (nameProduct === "" || priceProduct === "" || descriptionProduct === "" || typeProduct === "" || statusProduct === "") return false;
    const query = "INSERT INTO products (name_products, price_for_each, description, image, type_of_product, status, date_of_products_add, date_of_products_edit, id_user) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?)";
    try {
        const [rows] = await pool.query(query, [nameProduct, priceProduct, descriptionProduct, imageProduct, typeProduct, statusProduct, id_user]);
        return rows;
    } catch (error) {
        console.error("Error al crear un nuevo producto:", error);
        return false;
    }
}

export const editProduct = async ({ id, nameProduct, priceProduct, descriptionProduct, imageProduct, typeProduct, statusProduct }) => {
    if (nameProduct === "" || priceProduct === "" || descriptionProduct === "" || typeProduct === "" || statusProduct === "") return false;
    const query = "UPDATE products SET name_products = ?, price_for_each = ?, description = ?, image = ?, type_of_product = ?, status = ?, date_of_products_edit = CURRENT_TIMESTAMP WHERE id = ?";
    try {
        const [rows] = await pool.query(query, [nameProduct, priceProduct, descriptionProduct, imageProduct, typeProduct, statusProduct, id]);
        return rows;
    } catch (error) {
        console.error("Error al editar el producto:", error);
        return false;
    }
}

export const deleteProduct = async ({ id }) => {
    const query = "DELETE FROM products WHERE id = ?";
    try {
        const [rows] = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        return false;
    }
}
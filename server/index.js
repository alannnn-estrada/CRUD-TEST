import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import { newUser, getUser, getProducts, newProduct, editProduct, deleteProduct } from "./database.js";
const app = express();
const port = 3001;

const corsOptions = {
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionSuccessStatus: 200,
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads')); //uploads folder static
app.use((req, res, next) => {
    console.log("Solicitud recibida:", req.method, req.url);
    console.log("Cuerpo de la solicitud:", req.body);
    next();
});

// Post API section

app.post("/post/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await getUser({ username });
        if (existingUser.length) {
            res.status(409).send({ message: "El nombre de usuario ya está en uso" });
        } else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const query = await newUser({ username, hashedPassword });
            if (!query) {
                return res.status(500).send({
                    message: "Error al crear el usuario", error: query
                });
            }
            const storedUser = await getUser({ username });
            res.status(200).send({ message: "Usuario creado correctamente", result: storedUser });
        }
    } catch (error) {
        console.log("Error al crear el usuario")
        res.status(500).send({ messageServer: "Error al crear el usuario: " + error, message: "Error al crear el usuario" });
    }
});



app.post("/post/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const storedUser = await getUser({ username });
        console.log(storedUser);

        if (storedUser.length > 0) {
            const match = await bcrypt.compare(password, storedUser[0].password);

            if (match) {
                res.status(200).send({ message: "Usuario logueado correctamente", result: storedUser });
            } else {
                console.log("Contraseña incorrecta");
                res.status(401).send({ message: "Contraseña incorrecta" });
            }
        } else {
            console.log("Usuario no encontrado");
            res.status(404).send({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ messageServer: "Error al iniciar sesión " + error, message: "Error al iniciar sesión" });
    }
});


app.post("/post/table", async (req, res) => {
    const { username, password } = req.body;
    try {
        const storedUser = await getUser({ username });
        if (storedUser) {
            const match = password === storedUser[0].password;
            if (match) {
                const query = await getProducts({ id: storedUser[0].id });
                if (!query) return res.status(500).send({
                    message: "Error al obtener los productos, usuario iniciado", error: query
                });
                res.status(200).send({ message: "Productos obtenidos correctamente", result: query });
            } else {
                console.log("Contraseña incorrecta")
                res.status(401).send({ message: "Contraseña incorrecta" });
            }
        }
    } catch (error) {
        res.status(500).send({ messageServer: "Error al obtener los productos: " + error, message: "Error al obtener los productos" });
    }
});

app.post("/post/newProduct", async (req, res) => {
    const { nameProduct, priceProduct, descriptionProduct, imageProduct, typeProduct, statusProduct, username, password } = req.body;
    try {
        const storedUser = await getUser({ username });
        if (storedUser) {
            const match = password === storedUser[0].password;
            if (match) {
                const query = await newProduct({ id_user: storedUser[0].id, nameProduct, priceProduct, descriptionProduct, imageProduct, typeProduct, statusProduct });
                if (!query) return res.status(500).send({
                    message: "Error al crear el producto, usuario iniciado", error: query, messageServer: "Error al crear el producto, usuario iniciado: " + query
                });
                res.status(200).send({ message: "Producto creado correctamente", result: query });
            } else {
                console.log("Contraseña incorrecta")
                res.status(401).send({ message: "Contraseña incorrecta", messageServer: "Contraseña incorrecta" + error });
            }
        }
    } catch (error) {
        res.status(500).send({ messageServer: "Error al crear el producto: " + error, message: "Error al crear el producto" });
    }
});

app.post("/post/editProduct", async (req, res) => {
    const { id, nameProduct, priceProduct, descriptionProduct, imageProduct, typeProduct, statusProduct, username, password } = req.body;
    try {
        const storedUser = await getUser({ username });
        if (storedUser) {
            const match = password === storedUser[0].password;
            if (match) {
                const query = await editProduct({ id, nameProduct, priceProduct, descriptionProduct, imageProduct, typeProduct, statusProduct });
                if (!query) return res.status(500).send({
                    message: "Error al editar el producto, usuario iniciado", error: query
                });
                console.log(query)
                res.status(200).send({ message: "Producto editado correctamente", result: query });
            } else {
                res.status(401).send({ message: "Contraseña incorrecta" });
            }
        }
    } catch (error) {
        res.status(500).send({ messageServer: "Error al editar el producto: " + error, message: "Error al editar el producto" });
    }
});

app.post("/post/deleteProduct", async (req, res) => {
    const { id, username, password } = req.body;
    try {
        const storedUser = await getUser({ username });
        if (storedUser) {
            const match = password === storedUser[0].password;
            if (match) {
                const query = await deleteProduct({ id });
                if (!query) return res.status(500).send({
                    message: "Error al eliminar el producto, usuario iniciado", error: query
                });
                res.status(200).send({ message: "Producto eliminado correctamente", result: query });
            } else {
                res.status(401).send({ message: "Contraseña incorrecta" });
            }
        }
    } catch (error) {
        res.status(500).send({ messageServer: "Error al eliminar el producto: " + error, message: "Error al eliminar el producto" });
    }
});

app.post("/post/upload", upload.single('file'), async (req, res) => {
    const { username, password } = req.body;
    try {
        const storedUser = await getUser({ username });
        if (storedUser) {
            const match = password === storedUser[0].password;
            if (match) {
                const imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
                res.status(200).send({ message: "Imagen subida correctamente", result: imageUrl });
            } else {
                res.status(401).send({ message: "Contraseña incorrecta" });
            }
        }
    } catch (error) {
        res.status(500).send({ messageServer: "Error al subir la imagen: " + error, message: "Error al subir la imagen" });
    }
});

// General API section

app.get("/", (req, res) => {
    res.send(
        `<div style="display: flex; flex-direction: column; align-items: center;">
        <h1>API de usuarios</h1>
        <p>Para crear un usuario, haz una petición POST a /register con el nombre de usuario y la contraseña en el body</p>
        <p>Para iniciar sesión, haz una petición POST a /login con el nombre de usuario y la contraseña en el body</p>
        <div>`
    );
});

app.get("*", (req, res) => {
    res.status(404).send({ message: "Ruta no encontrada" });
});

app.post("*", (req, res) => {
    res.status(404).send({ message: "Ruta no encontrada" });
});


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
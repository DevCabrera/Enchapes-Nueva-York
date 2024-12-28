require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { dbConnectMySql } = require("./config/mysql");
const passport = require('./config/passPort');
const session = require('express-session');
const app = express();
const ENGINE_DB = process.env.ENGINE_DB;

const start = async () => {
    try {
        // Middleware
        app.use(cors({
            origin: "http://localhost:5173", // Dominio del frontend
            credentials: true, // Permite enviar cookies
        }));
        app.use(express.json());
        app.use(cookieParser()); // Middleware para cookies
        app.use(express.static("storage")); // Cargar storage
        // Configurar sesiones para Passport 
        app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
        app.use(passport.initialize()); app.use(passport.session());
        // Conexión a la base de datos
        if (ENGINE_DB === 'mysql') {
            await dbConnectMySql();
            console.log('Conectado ✅');
        } else {
            console.log('Error de conexión con MySQL ❌');
        }

        // Rutas
        app.use("/api", require("./routes"));

        // Iniciar servidor
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port} ✅`);
        });
    } catch (error) {
        console.log("Error al iniciar el servidor ❌", error);
        process.exit(1);
    }
};

start();

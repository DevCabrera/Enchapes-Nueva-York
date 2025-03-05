// 1. Variables de entorno y configuración global
require('dotenv').config();

// 2. Importaciones de librerías externas
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');

// 3. Configuraciones y middleware personalizados
const passport = require('./config/passPort');
const { dbConnectMySql, sequelize } = require('./config/mysql');
require('./models/MySql/associations'); // Importar para configurar asociaciones
const routes = require('./routes');

// 4. Inicialización de la aplicación
const app = express();

// 5. Configuraciones generales
const ENGINE_DB = process.env.ENGINE_DB;
const SYNC_DB = process.env.SYNC_DB === "true"; // Controlar sincronización
const googleClientId = process.env.GOOGLE_CLIENT_ID;

// 6. Middleware de terceros
app.use(cors({
    origin: 'http://localhost:5173', // Reemplazar la url con el front /5173 react y 4200 angular
    credentials: true,
}));
app.use(cookieParser());
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "script-src": ["'self'", "https://accounts.google.com"],
            "img-src": ["'self'", "data:", "https://accounts.google.com"],
        },
    },
    permissionsPolicy: {
        features: {
            "identity-credentials-get": ["self"],
        },
    },
}));

// 7. Configuración de la sesión
const sessionOptions = {
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24, // 1 día
    },
};
app.use(session(sessionOptions));

// 8. Middleware para manejo de datos JSON y archivos estáticos
app.use(express.json());
app.use(express.static('storage'));

// 9. Configuración de Passport.js
app.use(passport.initialize());
app.use(passport.session());

// 10. Conexión y sincronización de la base de datos
if (ENGINE_DB === 'mysql') {
    dbConnectMySql()
        .then(() => {
            console.log('Conexión con MySQL exitosa ✅');

            // Controlar sincronización según la variable de entorno
            if (SYNC_DB) {
                sequelize.sync({ alter: true })
                    .then(() => {
                        console.log('Base de datos sincronizada correctamente ✅');
                    })
                    .catch((error) => {
                        console.error('Error al sincronizar la base de datos ❌:', error.message);
                    });
            } else {
                console.log('Sincronización de base de datos desactivada.');
            }
        })
        .catch((err) => {
            console.error('Error de conexión con MySQL ❌:', err.message);
        });
}

// 11. Rutas de configuración general
app.get('/api/config', (req, res) => {
    res.json({ googleClientId });
});

// 12. Rutas principales
app.use('/api', routes);

// 13. Inicialización del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port} ✅`);
});

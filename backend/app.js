require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const passport = require('./config/passPort');
const { dbConnectMySql } = require('./config/mysql');
const routes = require('./routes');

const app = express();
const ENGINE_DB = process.env.ENGINE_DB;
const googleClientId = process.env.GOOGLE_CLIENT_ID;

// Configurar CORS para permitir peticiones desde el frontend
app.use(cors({
    origin: 'http://localhost:5173', // Reemplaza con la URL de tu frontend
    credentials: true,
}));
app.use(cookieParser());
// Configurar encabezados de seguridad con helmet
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
const sessionOptions = {
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Secreto usado para firmar la cookie de sesión
    resave: false, // No guarda la sesión en el almacenamiento si no ha cambiado
    saveUninitialized: false, // No guarda sesiones vacías
    cookie: {
        httpOnly: true, // La cookie no es accesible desde JavaScript en el navegador
        secure: false, // Solo se envía en HTTPS
        sameSite: 'strict', // Previene ataques CSRF al restringir la cookie al mismo origen
        maxAge: 1000 * 60 * 60 * 24, // Tiempo de vida de la cookie (1 día en milisegundos)
    },
};

app.use(session(sessionOptions));

app.use(express.json());

app.use(express.static('storage'));
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/config', (req, res) => {
    res.json({ googleClientId });
});

if (ENGINE_DB === 'mysql') {
    dbConnectMySql().then(() => {
        console.log('Conectado ✅');
    }).catch(err => {
        console.error('Error de conexión con MySQL ❌', err);
    });
}

app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port} ✅`);
});

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

app.use(express.json());
app.use(cookieParser());
app.use(express.static('storage'));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
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

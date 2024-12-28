const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require("../models/MySql/users");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    async (token, tokenSecret, profile, done) => {
        try {
            const existingUser = await Users.findOne({ where: { email: profile.emails[0].value } });
            if (existingUser) {
                return done(null, existingUser);
            }
            const newUser = await Users.create({
                email: profile.emails[0].value,
                nombre: profile.displayName,
                apellido: profile.name.familyName,
                password: null, // No es necesario almacenar una contraseña
                id_tipo_usuario: 2, // Ajusta según tu lógica de roles de usuario
            });
            done(null, newUser);
        } catch (error) {
            done(error, false);
        }
    }));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Users.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;

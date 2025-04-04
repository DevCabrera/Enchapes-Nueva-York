require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Enchapes Nueva York" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });
        console.log("Correo enviado: %s", info.messageId);
    } catch (error) {
        console.error("Error al enviar el correo:", error.message);
        throw error;
    }
};

module.exports = sendEmail;
const sendEmail = require('../utils/email');

// Enviar correo de bienvenida
const sendWelcomeEmail = async (nombre, email) => {
    const subject = '¡Bienvenido a Enchapes Nueva York!';
    const text = `Hola ${nombre}, gracias por registrarte en nuestra plataforma.`;
    const html = `<h1>Bienvenido, ${nombre}!</h1><p>Gracias por registrarte en nuestra plataforma.</p>`;
    await sendEmail(email, subject, text, html);
};

// Enviar confirmación de pedido
const sendOrderConfirmationEmail = async (order) => {
    const subject = 'Confirmación de tu pedido';
    const text = `Tu pedido con ID ${order.id} ha sido confirmado.`;
    const html = `<h1>Pedido confirmado</h1><p>Tu pedido con ID <b>${order.id}</b> ha sido confirmado.</p>`;
    await sendEmail(order.userEmail, subject, text, html);
};

// Enviar actualización de estado de envío
const sendShippingStatusEmail = async (order) => {
    const subject = 'Actualización de estado de envío';
    const text = `El estado de tu pedido con ID ${order.id} ha cambiado a: ${order.shippingStatus}.`;
    const html = `<h1>Estado de envío actualizado</h1><p>El estado de tu pedido con ID <b>${order.id}</b> ahora es: <b>${order.shippingStatus}</b>.</p>`;
    await sendEmail(order.userEmail, subject, text, html);
};

// Enviar confirmación de pago
const sendPaymentConfirmationEmail = async (payment) => {
    const subject = 'Confirmación de pago';
    const text = `Tu pago con ID ${payment.id} ha sido procesado exitosamente.`;
    const html = `<h1>Pago confirmado</h1><p>Tu pago con ID <b>${payment.id}</b> ha sido procesado exitosamente.</p>`;
    await sendEmail(payment.userEmail, subject, text, html);
};

const sendPaymentRefuseEmail = async (payment) => {
    const subject = 'Rechazo de pago';
    const text = `Tu pago con ID ${payment.id} ha sido rechazado.`;
    const html = `<h1>Pago Rechazado</h1><p>Tu pago con ID <b>${payment.id}</b> ha sido rechazado, por favor ponerse en contacto.</p>`;
    await sendEmail(payment.userEmail, subject, text, html);
};

module.exports = {
    sendWelcomeEmail,
    sendOrderConfirmationEmail,
    sendShippingStatusEmail,
    sendPaymentConfirmationEmail,
    sendPaymentRefuseEmail
};
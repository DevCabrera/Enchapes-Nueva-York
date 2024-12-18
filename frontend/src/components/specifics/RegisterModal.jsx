import PropTypes from "prop-types";
import { useState } from "react";
import { createUser } from "../../../Client/Services/userServices";

const RegisterModal = ({ open, onClose }) => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null); // Estado para mensajes de error
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para evitar múltiples envíos

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita la recarga de la página

    // Validación de contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsSubmitting(true); // Inicia el estado de envío
    setError(null); // Limpia errores previos

    try {
      // Mapeo de datos para adaptarse a la estructura del backend
      const userData = {
        email: formData.email,
        nombre: formData.firstName,
        apellido: formData.lastName,
        password: formData.password,
      };

      // Llamada al servicio de creación de usuario
      await createUser(userData);

      // Notificación de éxito
      alert("Registro exitoso. ¡Bienvenido!");
      onClose(); // Cierra el modal

      // Reinicia los campos del formulario
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error al registrar:", error);
      setError(
        error.response?.data?.message ||
          "Hubo un problema al registrarse. Intenta nuevamente."
      );
    } finally {
      setIsSubmitting(false); // Finaliza el estado de envío
    }
  };

  // Si el modal no está abierto, no renderizar nada
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-96 p-6">
        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 float-right"
        >
          &times;
        </button>

        {/* Contenido del modal */}
        <h2 className="text-2xl font-bold text-center mb-4">
          Registro con Email
        </h2>

        {/* Mensaje de error */}
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          {/* Apellido */}
          <div className="mb-4">
            <label className="block text-gray-700">Apellido:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          {/* Contraseña */}
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          {/* Confirmar Contraseña */}
          <div className="mb-4">
            <label className="block text-gray-700">Confirmar Contraseña:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          {/* Botón de registro */}
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600 ${
              isSubmitting && "opacity-50 cursor-not-allowed"
            }`}
            disabled={isSubmitting} // Deshabilita el botón mientras se procesa
          >
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};

RegisterModal.propTypes = {
  open: PropTypes.bool.isRequired, // Indica si el modal está abierto
  onClose: PropTypes.func.isRequired, // Función para cerrar el modal
};

export default RegisterModal;

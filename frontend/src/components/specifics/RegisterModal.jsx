import PropTypes from "prop-types";
import { useState } from "react";
import { createUser } from "../../../Client/Services/userServices";
import { validateRegisterFields } from "../../validators/ValidatorRegister";
import Swal from "sweetalert2";
import PhoneInput from "./PhoneInput";

const RegisterModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phone: "",
    countryCode: "+56",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: e.target.value,
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegisterFields(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const userData = {
        email: formData.email,
        nombre: formData.firstName,
        apellido: formData.lastName,
        password: formData.password,
        celular: `${formData.countryCode}${formData.phone}`,
      };

      await createUser(userData);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registro exitoso, ya puedes iniciar sesión!",
        text: "¡Bienvenido!",
        showConfirmButton: false,
        timer: 1500,
      });
      onClose();

      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        phone: "",
        countryCode: "+56",
      });
    } catch (error) {
      console.error("Error al registrar:", error);
      setErrors({
        form:
          error.response?.data?.message ||
          "Hubo un problema al registrarse. Intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-96 p-6 bg-gradient-to-tr from-[#6b7a96] to-[#FFFFFF]">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 float-right"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">
          Registro con Email
        </h2>

        {errors.form && (
          <div className="mb-4 text-red-500 text-center">{errors.form}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              placeholder="Enchapes@gmail.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border border-[#353535] rounded px-3 py-2 ${
                errors.email ? "border-red-500" : ""
              }`}
              required
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre:</label>
            <input
              placeholder="Enchapes"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full border border-[#353535] rounded px-3 py-2 ${
                errors.firstName ? "border-red-500" : ""
              }`}
              required
            />
            {errors.firstName && (
              <div className="text-red-500">{errors.firstName}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Apellido:</label>
            <input
              placeholder="Nueva York"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full border border-[#353535] rounded px-3 py-2 ${
                errors.lastName ? "border-red-500" : ""
              }`}
              required
            />
            {errors.lastName && (
              <div className="text-red-500">{errors.lastName}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border border-[#353535] rounded px-3 py-2 ${
                errors.password ? "border-red-500" : ""
              }`}
              required
            />
            {errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirmar Contraseña:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border border-[#353535] rounded px-3 py-2 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              required
            />
            {errors.confirmPassword && (
              <div className="text-red-500">{errors.confirmPassword}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Celular:</label>
            <PhoneInput
              value={formData.phone}
              onChange={handlePhoneChange}
              error={errors.phone}
            />
          </div>

          <button
            type="submit"
            className={`text-white px-4 py-2 w-full rounded bg-[#2c4255] hover:bg-[#3c5d7a] ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};

RegisterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RegisterModal;

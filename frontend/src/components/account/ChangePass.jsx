import { useState } from "react";
import { updatePassword } from "../../../Client/Services/userServices";
import { useAuth } from "../../../Client/Context/AuthProvider";
import { validateChangePass } from "../../validators/ValidatorChangePass"; // Importar el validador
import Swal from "sweetalert2";

const ChangePass = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validationErrors, setValidationErrors] = useState({}); // Estado para errores de validación

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
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setValidationErrors({}); // Limpiar errores de validación anteriores

    // Validar el formulario
    const errors = validateChangePass(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); // Mostrar errores de validación
      return;
    }

    try {
      // Enviar la solicitud al backend
      await updatePassword(user.email, {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Contraseña actualizada con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
      setSuccess("Contraseña actualizada exitosamente.");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Hubo un problema al actualizar la contraseña."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Contraseña</h3>
      </div>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña Actual</label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nueva Contraseña</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded shadow-sm ${
              validationErrors.newPassword ? "border-red-500" : ""
            }`}
            required
          />
          {validationErrors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.newPassword}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Confirmar Nueva Contraseña
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded shadow-sm ${
              validationErrors.confirmPassword ? "border-red-500" : ""
            }`}
            required
          />
          {validationErrors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.confirmPassword}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-[#2c4255] hover:bg-[#3c5d7a] text-white py-2 px-4 rounded"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default ChangePass;

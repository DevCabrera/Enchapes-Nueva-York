import { useState } from "react";
import { updatePassword } from "../../../Client/Services/userServices"; // Nueva función para actualizar la contraseña
import { useAuth } from "../../../Client/Context/AuthProvider";

const ChangePass = () => {
  const { user } = useAuth(); // Obtener información del usuario
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

    // Validar que las contraseñas coincidan
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Las nuevas contraseñas no coinciden.");
      return;
    }

    try {
      // Enviar la solicitud al backend
      await updatePassword(user.email, {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
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
            className="w-full px-3 py-2 border rounded shadow-sm"
            required
          />
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
            className="w-full px-3 py-2 border rounded shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default ChangePass;

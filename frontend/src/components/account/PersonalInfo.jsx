import { useState } from "react";
import { Switch } from "@material-tailwind/react";
import { updateUser } from "../../../Client/Services/userServices";
import { useAuth } from "../../../Client/Context/AuthProvider";

const PersonalInfo = () => {
  const { user, setUser } = useAuth(); // Obtener el usuario del contexto
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    apellido: user?.apellido || "",
    email: user?.email || "",
    celular: user?.celular || "",
  });

  const handleSwitchChange = () => setIsEditable(!isEditable);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...(formData.nombre !== user.nombre && { nombre: formData.nombre }),
        ...(formData.apellido !== user.apellido && {
          apellido: formData.apellido,
        }),
        ...(formData.celular !== user.celular && { celular: formData.celular }),
      };

      const response = await updateUser(formData.email, updatedData);
      setUser((prevUser) => ({
        ...prevUser,
        ...response.user, // Actualiza solo los datos relevantes
      }));
      alert("Información actualizada exitosamente");
      setIsEditable(false);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Hubo un problema al actualizar la información");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-extrabold mr-4">Datos personales</h3>
        <Switch
          checked={isEditable}
          onChange={handleSwitchChange}
          color="green"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre*</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm"
            disabled={!isEditable}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Apellido*</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm"
            disabled={!isEditable}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Correo electrónico*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm"
            disabled={!isEditable}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Teléfono celular*</label>
          <input
            type="text"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm"
            disabled={!isEditable}
          />
        </div>
        {isEditable && (
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded"
          >
            Guardar
          </button>
        )}
      </form>
    </div>
  );
};

export default PersonalInfo;

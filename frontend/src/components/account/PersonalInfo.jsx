import { useState, useEffect } from "react";
import { Switch } from "@material-tailwind/react";
import { updateUser } from "../../../Client/Services/userServices";
import { useAuth } from "../../../Client/Context/AuthProvider";
import { validatePersonalFields } from "../../../src/validators/ValidatePersonal";

const PersonalInfo = () => {
  const { user, setUser } = useAuth();
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    celular: "",
    countryCode: "+56", // Nuevo campo para el código de país
    phone: "", // Nuevo campo para el número sin el código
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      // Separar el código de país y el número del celular
      const celular = user.celular || "";
      const countryCode = celular.startsWith("+56") ? "+56" : "";
      const phone = celular.replace(countryCode, "");

      setFormData({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        email: user.email || "",
        celular: user.celular || "",
        countryCode,
        phone,
      });
    }
  }, [user]);

  const handleSwitchChange = () => setIsEditable(!isEditable);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combinar el código de país y el número de teléfono
    const celularCompleto = `${formData.countryCode}${formData.phone}`;

    // Validar los campos
    const validationErrors = validatePersonalFields({
      ...formData,
      celular: celularCompleto,
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const updatedData = {
        ...(formData.nombre !== user.nombre && { nombre: formData.nombre }),
        ...(formData.apellido !== user.apellido && {
          apellido: formData.apellido,
        }),
        celular: celularCompleto,
      };

      const response = await updateUser(formData.email, updatedData);
      setUser((prevUser) => ({
        ...prevUser,
        ...response.user,
      }));

      alert("Información actualizada exitosamente");
      setIsEditable(false);
    } catch (error) {
      console.error("Error al actualizar usuario:", error.message);
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
          color="orange"
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
            className={`w-full px-3 py-2 border rounded shadow-sm ${
              errors.nombre ? "border-red-500" : ""
            }`}
            disabled={!isEditable}
          />
          {errors.nombre && (
            <div className="text-red-500 text-sm mt-1">{errors.nombre}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Apellido*</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded shadow-sm ${
              errors.apellido ? "border-red-500" : ""
            }`}
            disabled={!isEditable}
          />
          {errors.apellido && (
            <div className="text-red-500 text-sm mt-1">{errors.apellido}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Correo electrónico*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Teléfono celular*</label>
          <div className="flex">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="border rounded-l px-3 py-2"
              disabled={!isEditable}
            >
              <option value="+56">Chile (+56)</option>
            </select>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border rounded-r px-3 py-2 ${
                errors.celular ? "border-red-500" : ""
              }`}
              disabled={!isEditable}
            />
          </div>
          {errors.celular && (
            <div className="text-red-500 text-sm mt-1">{errors.celular}</div>
          )}
        </div>
        {isEditable && (
          <button
            type="submit"
            className="w-full bg-[#2c4255] hover:bg-[#3c5d7a] text-white py-2 px-4 rounded"
          >
            Guardar
          </button>
        )}
      </form>
    </div>
  );
};

export default PersonalInfo;
